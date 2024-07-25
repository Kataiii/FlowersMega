import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { ProductsService } from 'src/products/products.service';
import { ReviewsService } from 'src/reviews/reviews.service';
import { SizesService } from 'src/sizes/sizes.service';
import { ProductSize } from './products-sizes.model';

@Injectable()
export class ProductsSizesFullService {
    constructor(
        @InjectModel(ProductSize) private productsSizesRepository: typeof ProductSize,
        private productsService: ProductsService,
        private sizesService: SizesService,
        private reviewsService: ReviewsService
    ){}

    private async getCardInfo(productSize: ProductSize){
        const size = await this.sizesService.getById(productSize.idSize);
        const product = await this.productsService.getById(productSize.idProduct);
        const reviewsInfo = await this.reviewsService.getStaticticByProductSizeId(productSize.id);

        return {
            size: size,
            product: {
                name: product.name,
                idTypeProduct: product.idTypeProduct,
                image: product.images[0],
                filters: product.filters,
                categories: product.categories
            },
            reviewsInfo: reviewsInfo
        }
    }

    async getFullById(id: number){
        const productSize = await this.productsSizesRepository.findOne(
            {
                where: {id: id}
            }
        );
        const info = await this.getCardInfo(productSize);
        return {
            productSize: productSize,
            size: info.size,
            product: info.product,
            reviewsInfo: info.reviewsInfo
        };
    }

    async getProductsSizesForCardPagination(page: number, limit: number){
        const count = await this.productsSizesRepository.findAndCountAll();
        const products = await this.productsSizesRepository.findAll({
            limit: limit,
            offset: (page - 1) * limit
        });
        const productsCardInfo = await Promise.all(products.map(async(item) => {
            const info = await this.getCardInfo(item);
            return {
                productSize: item,
                size: info.size,
                product: info.product,
                reviewsInfo: info.reviewsInfo
            }
        }));

        return {
            count: count,
            products: productsCardInfo
        }
    }
}
