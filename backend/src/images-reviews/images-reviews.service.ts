import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { FilesService } from 'src/files/files.service';
import { CreateImageReviewDto } from './dto/createImagesReviews.dto';
import { ImageReview } from './images-reviews.model';

@Injectable()
export class ImagesReviewsService {
    constructor(
        @InjectModel(ImageReview) private imagesReviewsRepository: typeof ImageReview,
        private filesService: FilesService
    ){}

    async create(dto: CreateImageReviewDto){
        const fileName = await this.filesService.createImageReview(dto.image, dto.idReview);
        return await this.imagesReviewsRepository.create({
            idReview: dto.idReview,
            url: fileName
        });
    }
}
