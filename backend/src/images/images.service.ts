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
        let fileName = undefined;
        if(dto.image){
            fileName = await this.filesService.createImageProduct(dto.image, dto.idProduct);
        }
        return await this.imagesRepository.update({
            idProduct: dto.idProduct,
            url: fileName
        }, { where: { id: dto.id } });
    }
}
