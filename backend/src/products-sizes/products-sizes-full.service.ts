import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CategoriesProductsService } from 'src/categories-products/categories-products.service';
import { ProductsItemsFilterService } from 'src/products-items-filter/products-items-filter.service';
import { ProductsService } from 'src/products/products.service';
import { ReviewsService } from 'src/reviews/reviews.service';
import { SizesService } from 'src/sizes/sizes.service';
import { CreateFullProductSizeDto } from './dto/createFullProduct.dto';
import { ProductSize } from './products-sizes.model';

@Injectable()
export class ProductsSizesFullService {
    constructor(
        @InjectModel(ProductSize) private productsSizesRepository: typeof ProductSize,
        private productsService: ProductsService,
        private sizesService: SizesService,
        private reviewsService: ReviewsService,
        private categoriesProductService: CategoriesProductsService,
        private productsItemsFilterService: ProductsItemsFilterService
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

    async getProductSizeInfo(id: number){
        const productSize = await this.productsSizesRepository.findOne({where: {id: id}});
        const size = await this.sizesService.getById(productSize.idSize);
        return {productSize: productSize, size: size}
    }

    async getProductsWithPagination(page: number, limit: number, search?: string){
        const paginationResult = await this.productsService.getCountAndPagination(page, limit, search);
        const productSizesTmp = await Promise.all(paginationResult.products.map(async(item) => {
            const productSizes = await this.productsSizesRepository.findAll({where: {idProduct: item.id}});
            const productWithSizes = await Promise.all(productSizes.map(async(item) => {
                return await this.getProductSizeInfo(item.id);
            })) 
            return {products: item, productsSizes: productWithSizes};
        }));
        return {count: paginationResult.count, products: productSizesTmp};
    }

    async createFullProduct(dto: CreateFullProductSizeDto, photo: File){
        const product = await this.productsService.create({
            name: dto.name,
            description: dto.description,        
            structure: dto.structure,
            idTypeProduct: dto.type
        }, [photo]);
        await Promise.all(dto.productSize.map(async(item) => {
            return await this.productsSizesRepository.create({
                idProduct: product.id,
                idSize: item.idSize,
                paramsSize: item.paramsSize,
                prise: item.prise
            })
        }));
        await Promise.all(dto.categories.map(async(item) => {
            return await this.categoriesProductService.create({
                idProduct: product.id,
                //@ts-ignore
                idCategory: item.id
            })
        }));

        await Promise.all(dto.filters.map(async(item) => {
            return await Promise.all(item.tags.map(async(itemTags) => {
                return await this.productsItemsFilterService.create({
                    idProduct: product.id,
                    idItemFilter: itemTags.id
                });
            }));
        }));

        return product;
    }
}
