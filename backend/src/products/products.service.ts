import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Op } from 'sequelize';
import { Image } from 'src/images/images.model';
import { ImagesService } from 'src/images/images.service';
import { CreateProductDto } from './dto/createProduct.dto';
import { Product } from './products.model';

@Injectable()
export class ProductsService {
    constructor(
        @InjectModel(Product) private productsRepository: typeof Product,
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
        if (product === null) throw new HttpException("Product not found", HttpStatus.NOT_FOUND);
        return product;
    }

    async getCountAndPagination(page: number, limit: number, search?: string, field?: string, type?: string, categories?: number[], filters?: number[]) {
        if (search) {
            const count = (await this.productsRepository.findAndCountAll({
                where: { name: { [Op.like]: `%${search}%` } }
            })).count;
            const products = await this.productsRepository.findAll({
                where: { name: { [Op.like]: `%${search}%` } },
                include: [{ all: true }],
                limit: limit,
                offset: (page - 1) * limit,
                order: field && type ? [[field, type]] : [["updatedAt", "DESC"]],
            });

            return { count: count, products: products };
        }

        const count = (await this.productsRepository.findAndCountAll()).count;
        const products = await this.productsRepository.findAll({
            limit: limit,
            offset: (page - 1) * limit,
            order: field && type ? [[field, type]] : [["updatedAt", "DESC"]]
        });
        return { count: count, products: products };
    }
}
