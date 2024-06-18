import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { ImagesReviewsService } from 'src/images-reviews/images-reviews.service';
import { CreateReviewDto } from './dto/createReviews.dto';
import { Review } from './reviews.model';

@Injectable()
export class ReviewsService {
    constructor(
        @InjectModel(Review) private reviewsRepository: typeof Review,
        private imagesReviewsService: ImagesReviewsService
    ){}

    async create(dto: CreateReviewDto){
        const review = await this.reviewsRepository.create({
            rating: dto.rating,
            comment: dto.comment, 
            idUser: dto.idUser,
            idProductSize: dto.idProductSize
        });
        dto.images.forEach( async(item) => {
            await this.imagesReviewsService.create({
                idReview: review.id,
                image: item
            });
        })
        return await this.reviewsRepository.findOne({where: {id: review.id}, include: [{ all: true}]});
    }

    async getAll(){
        const reviews = await this.reviewsRepository.findAll({
            order: [["idProductSize", "ASC"]],
            include: [{ all: true }]
        })
        if(reviews.length === 0) throw new HttpException("Reviews not fount", HttpStatus.NOT_FOUND);
        return reviews;
    }

    async getById(id: number | string){
        const review = await this.reviewsRepository.findOne(
            {
                where: {id: id}, 
                include: [{ all: true }]
            }
        );
        if(review === null) throw new HttpException("Review not found", HttpStatus.NOT_FOUND);
        return review;
    }

    async getByProductSizeId(idProductSize: number | string){
        const reviews = await this.reviewsRepository.findAll({
            where: { idProductSize: idProductSize },
            include: [{ all: true }]
        });
        if(reviews.length === 0) throw new HttpException("Reviews not fount", HttpStatus.NOT_FOUND);
        return reviews;
    }
}
