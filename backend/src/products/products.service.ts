import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Op } from 'sequelize';
import { Image } from 'src/images/images.model';
import { ImagesService } from 'src/images/images.service';
import { CreateProductDto } from './dto/createProduct.dto';
import { Product } from './products.model';
import { count } from 'console';
import { ProductSize } from 'src/products-sizes/products-sizes.model';
import { Category } from 'src/categories/categories.model';

@Injectable()
export class ProductsService {
    constructor(
        @InjectModel(Product) private productsRepository: typeof Product,
        @InjectModel(ProductSize) private productSizesRepository: typeof ProductSize,
        private imagesService: ImagesService

    ) { }

    async create(dto: CreateProductDto, images: File[]) {
        const product = await this.productsRepository.create({
            name: dto.name,
            description: dto.description,
            idTypeProduct: dto.idTypeProduct,
            structure: dto.structure
        });
        images.forEach(async (item) => {
            await this.imagesService.create({
                idProduct: product.id,
                image: item
            });
        })
        return await this.productsRepository.findOne({ where: { id: product.id }, include: [{ all: true }] });
    }

    async getAll() {
        const products = await this.productsRepository.findAll({
            order: [["name", "ASC"]],
            include: [{
                model: Image
            }]
        })
        if (products.length === 0) throw new HttpException("Products not fount", HttpStatus.NOT_FOUND);
        return products;
    }

    async getById(id: number | string) {
        const product = await this.productsRepository.findOne(
            {
                where: { id: id },
                include: [{
                    all: true
                }]
            }
        );
        // if (product === null) throw new HttpException("Product not found", HttpStatus.NOT_FOUND);
        return product;
    }

    async getProductsByCategoryId(categoryId: number) {
        const products = await this.productsRepository.findAll({
            include: [{
                model: Category,
                where: { id: categoryId },
            }],
        });
        return products;
    }

    async getCountAndPagination(page: number, limit: number, search?: string, field?: string, type?: string, idProduct?: number[]) {
        console.log(idProduct, "idProduct");

        const whereContidion = {
            name: { [Op.like]: search ? `%${search}%` : `%` },
            id: { [Op.in]: idProduct },
        }

        const countTmp = (await this.productsRepository.findAndCountAll({

            where: whereContidion,
            order: field && type ? [[field, type]] : [["updatedAt", "DESC"]],
            limit: limit,
            offset: (page - 1) * limit,
        }
        ));
        // console.log(countTmp, "CountTMOP");

        // console.log(idProductsCount, "idPrd");
        // const resultCount = idProductsCount.map(item => item.count).reduce((a, b) => a + b, 0);
        // const resultProducts = idProductsCount.map(item => item.rows).flat();
        // console.log('count: ', resultCount);
        // console.log('products: ', resultProducts);

        return { count: countTmp.count, products: countTmp.rows };

    }

    async deleteProduct(id: number) {
        const product = await this.productsRepository.findOne({ where: { id } });
        if (!product) {
            throw new HttpException('Product not found', HttpStatus.NOT_FOUND);
        }
        const productSizes = await this.productSizesRepository.findAll({ where: { idProduct: id } });

        const productSizeCount = productSizes.length;
        if (productSizeCount > 0) {
            throw new HttpException(
                `Product has ${productSizeCount} related product sizes. Deleting them will remove all related data.`,
                HttpStatus.BAD_REQUEST
            );
        }
        await this.productsRepository.destroy({ where: { id } });

        return { message: `Product with ID ${id} and all related data were deleted successfully` };
    }

    async countProductSizesByProductId(productId: number): Promise<number> {
        const count = await this.productSizesRepository.count({
            where: { idProduct: productId }
        });
        return count;
    }

}
