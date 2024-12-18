import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { FilesService } from 'src/files/files.service';
import { CreateImageDto, UpdateImageDto } from './dto/createImages.dto';
import { Image } from './images.model';

@Injectable()
export class ImagesService {
    constructor(
        @InjectModel(Image) private imagesRepository: typeof Image,
        private filesService: FilesService
    ) { }

    async create(dto: CreateImageDto) {
        const fileName = await this.filesService.createImageProduct(dto.image, dto.idProduct);
        return await this.imagesRepository.create({
            idProduct: dto.idProduct,
            url: fileName
        });
    }

    async update(dto: UpdateImageDto) {
        if(dto.images){
            const imgUrls = await this.imagesRepository.findAll({where: {idProduct: dto.idProduct}});
            await Promise.all(dto.images.map(async(item, index) => {
                if(imgUrls[index]?.url){
                    await this.filesService.updateImage(imgUrls[index].url, dto.idProduct.toString(), item);
                } else {
                    await this.create({
                        idProduct: dto.idProduct,
                        image: item
                    })
                }
            }))
        }
    }
}
