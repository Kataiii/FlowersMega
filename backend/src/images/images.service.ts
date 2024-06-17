import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { FilesService } from 'src/files/files.service';
import { CreateImageDto } from './dto/createImages.dto';
import { Image } from './images.model';

@Injectable()
export class ImagesService {
    constructor(
        @InjectModel(Image) private imagesRepository: typeof Image,
        private filesService: FilesService
    ){}

    async create(dto: CreateImageDto){
        const fileName = await this.filesService.createImageProduct(dto.image, dto.idProduct);
        return await this.imagesRepository.create({
            idProduct: dto.idProduct,
            url: fileName
        });
    }
}
