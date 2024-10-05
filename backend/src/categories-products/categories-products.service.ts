import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CategoriesProducts } from './categories_products.model';
import { CreateCategoriesProductDto } from './dto/createCategoriesProduct.dto';

@Injectable()
export class CategoriesProductsService {
    constructor(
        @InjectModel(CategoriesProducts) private categoriesProductsRepository: typeof CategoriesProducts,
    ) { }

    async getByCategoryIdCount(id: number) {
        const categories = await this.categoriesProductsRepository.findAndCountAll({
            where: { idCategory: id }
        });
        return categories.count;
    }

    async getProductsByCategoryId(id: number) {
        const categories = await this.categoriesProductsRepository.findAll({
            where: { idCategory: id }
        });
        return categories;
    }

    async create(dto: CreateCategoriesProductDto) {
        return await this.categoriesProductsRepository.create(dto);
    }
}
