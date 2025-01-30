import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Op, Sequelize } from 'sequelize';
import { Image } from 'src/images/images.model';
import { ImagesService } from 'src/images/images.service';
import { CreateProductDto, UpdateProductDto } from './dto/createProduct.dto';
import { Product } from './products.model';
import { ProductSize } from 'src/products-sizes/products-sizes.model';
import { Category } from 'src/categories/categories.model';
import { ExtraPriceService } from 'src/extra-price/extra-price.service';

@Injectable()
export class ProductsService {
    constructor(
        @InjectModel(Product) private productsRepository: typeof Product,
        @InjectModel(ProductSize) private productSizesRepository: typeof ProductSize,
        private imagesService: ImagesService,
        private extraPriceService: ExtraPriceService

    ) { }

    async create(dto: CreateProductDto, images: File[]) {
        const product = await this.productsRepository.create({
            name: dto.name,
            description: dto.description,
            idTypeProduct: dto.idTypeProduct,
            structure: dto.structure
        });
        if (images && images.length > 0) {
            images.forEach(async (item) => {
                await this.imagesService.create({
                    idProduct: product.id,
                    image: item
                });
            })
        }
        return await this.productsRepository.findOne({ where: { id: product.id }, include: [{ all: true }] });
    }

    async update(dto: UpdateProductDto, images: File[]) {
        await this.productsRepository.update(dto, { where: { id: dto.id } });
        if (images && images.length > 0) {
            await this.imagesService.update({
                idProduct: dto.id,
                images: images
            });
        }
        return await this.productsRepository.findOne({ where: { id: dto.id }, include: [{ all: true }] });
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

    async searchProducts(search: string) {
        const products = await this.productsRepository.findAll({
            where: Sequelize.where(
                Sequelize.fn('LOWER', Sequelize.col('name')),
                {
                    [Op.like]: `%${search.toLowerCase()}%`
                }
            ),
            order: [["name", "ASC"]],
            include: [{
                model: Image
            }]
        })
        return products;
    }

    async getCountAndPagination(page: number, limit: number, search?: string, field?: string, type?: string, idProduct?: number[]) {

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
