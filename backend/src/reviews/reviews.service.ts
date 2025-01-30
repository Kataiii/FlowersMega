import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Phone } from 'nestjs-telegraf';
import { Op } from 'sequelize';
import { ImagesReviewsService } from 'src/images-reviews/images-reviews.service';
import { ProductsSizesService } from 'src/products-sizes/products-sizes.service';
import { ProductsService } from 'src/products/products.service';
import { CreateReviewDto } from './dto/createReviews.dto';
import { FullReviewDto } from './dto/fullReview.dto';
import { UpdateReviewDto } from './dto/updateReview.dto';
import { Review } from './reviews.model';

@Injectable()
export class ReviewsService {
    constructor(
        @InjectModel(Review) private reviewsRepository: typeof Review,
        private imagesReviewsService: ImagesReviewsService,
        private productsSizesService: ProductsSizesService,
        private productsService: ProductsService
    ) { }

    async create(dto: CreateReviewDto, files: File[]) {
        const review = await this.reviewsRepository.create({
            rating: dto.rating,
            comment: dto.comment,
            idUser: dto.idUser,
            idProductSize: dto.idProductSize,
            firstname: dto.firstname,
            phone: dto.phone
        });
        if (files !== undefined) {
            files.forEach(async (item) => {
                await this.imagesReviewsService.create({
                    idReview: review.id,
                    image: item
                });
            })
        }
        return await this.reviewsRepository.findOne({ where: { id: review.id }, include: [{ all: true }] });
    }

    async getAll() {
        const reviews = await this.reviewsRepository.findAll({
            order: [["idProductSize", "ASC"]],
            include: [{ all: true }]
        })
        if (reviews.length === 0) throw new HttpException("Reviews not fount", HttpStatus.NOT_FOUND);
        return reviews;
    }

    async getById(id: number | string) {
        const review = await this.reviewsRepository.findOne(
            {
                where: { id: id },
                include: [{ all: true }]
            }
        );
        if (review === null) throw new HttpException("Review not found", HttpStatus.NOT_FOUND);
        return review;
    }

    async getByProductSizeId(idProductSize: number | string) {
        const reviews = await this.reviewsRepository.findAll({
            where: { idProductSize: idProductSize },
            include: [{ all: true }]
        });
        if (reviews.length === 0) throw new HttpException("Reviews not fount", HttpStatus.NOT_FOUND);
        return reviews;

    }

    private async convertReview(review: Review) {
        const productSize = await this.productsSizesService.getById(review.idProductSize);
        const product = productSize !== null ? await this.productsService.getById(productSize.idProduct) : null;
        return {
            id: review.id,
            rating: review.rating,
            comment: review.comment,
            idUser: review.idUser,
            firstname: review.firstname,
            phone: review.phone,
            idProductSize: review.idProductSize,
            createdAt: review.createdAt,
            updatedAt: review.updatedAt,
            images: review.images,
            product: product
        } as FullReviewDto;
    }

    async getReviewsAllWithPagination(page: number, limit: number, search?: string, field?: string, type?: string) {
        const whereContidion = { firstname: { [Op.like]: search ? `%${search}%` : `%` } }
        const reviewsCount = (await this.reviewsRepository.findAndCountAll({

            where: whereContidion,
            distinct: true,
            limit: limit,
            offset: (page - 1) * limit,
            include: ['images'],
            order: [[field, type]],


        }));


        // const reviews = (await this.reviewsRepository.findAll({
        //     
        //     where: ,

        // }));
        const fullReview: FullReviewDto[] = await Promise.all(reviewsCount.rows.map(async (item) => await this.convertReview(item)));
        return {
            count: reviewsCount.count,
            reviews: fullReview
        };

        // const reviewsCount = (await this.reviewsRepository.findAndCountAll()).count;

        // const reviews = await this.reviewsRepository.findAll({
        //     limit: limit,
        //     offset: (page - 1) * limit,
        //     include: [{ all: true }],
        //     order: [[field, type]],
        // });

        // if (reviews.length === 0) throw new HttpException("Reviews not fount", HttpStatus.NOT_FOUND);

        // const fullReview: FullReviewDto[] = await Promise.all(reviews.map(async (item) => await this.convertReview(item)));
        // return {
        //     count: reviewsCount,
        //     reviews: fullReview
        // };
    }

    async getStaticticByProductSizeId(id: number) {
        const reviews = await this.reviewsRepository.findAndCountAll({
            where: { idProductSize: id }
        });
        let averageRating = 0;

        reviews.rows.forEach(item => {
            averageRating += item.rating;
        })

        return {
            count: reviews.count,
            averageRating: averageRating / reviews.count
        }
    }

    async getRewiewsWithStatisticByProductId(id: number, limit: number, page: number) {
        const { count, averageRating } = await this.getStaticticByProductSizeId(id);
        const reviews = await this.reviewsRepository.findAll({
            where: { idProductSize: id },
            limit: limit,
            offset: (page - 1) * limit,
            include: [{ all: true }],
            order: [['createdAt', 'DESC']],
        })

        const fullReview: FullReviewDto[] = await Promise.all(reviews.map(async (item) => await this.convertReview(item)));
        return {
            count: count,
            averageRating: averageRating,
            reviews: reviews
        }
    }

    async update(dto: UpdateReviewDto) {
        const response = await this.reviewsRepository.update(dto, { where: { id: dto.id } });
        return await this.reviewsRepository.findOne({ where: { id: dto.id } });
    }

    async delete(id: number) {
        const review = await this.reviewsRepository.findOne({ where: { id: id } });
        const idReview = await this.reviewsRepository.destroy({ where: { id: id } });
        return review;
    }
}
