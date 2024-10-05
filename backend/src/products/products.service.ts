import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Op } from 'sequelize';
import { Image } from 'src/images/images.model';
import { ImagesService } from 'src/images/images.service';
import { CreateProductDto } from './dto/createProduct.dto';
import { Product } from './products.model';
import { count } from 'console';

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

    async getCountAndPagination(page: number, limit: number, search?: string, field?: string, type?: string, idProduct?: number[]) {
        console.log(idProduct, "idProduct");
        const idProductsCount = await Promise.all(idProduct.map(
            async item => {
                const countTmp = (await this.productsRepository.findAndCountAll({

                    where: {
                        name: { [Op.like]: search ? `%${search}%` : `%` },
                        id: item,
                    },

                    order: field && type ? [[field, type]] : [["updatedAt", "DESC"]],
                    limit: limit,
                    offset: (page - 1) * limit,
                }
                ));
                // console.log(countTmp, "CountTMOP");
                return countTmp;
            }
        ))
        // console.log(idProductsCount, "idPrd");
        const resultCount = idProductsCount.map(item => item.count).reduce((a, b) => a + b, 0);
        const resultProducts = idProductsCount.map(item => item.rows).flat();
        console.log('count: ', resultCount);
        // console.log('products: ', resultProducts);

        return { count: resultCount, products: resultProducts };

    }
}
