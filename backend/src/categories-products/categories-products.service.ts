import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CategoriesProducts } from './categories_products.model';
import { CreateCategoriesProductDto } from './dto/createCategoriesProduct.dto';
import { Category } from 'src/categories/categories.model';

@Injectable()
export class CategoriesProductsService {
    constructor(
        @InjectModel(CategoriesProducts) private categoriesProductsRepository: typeof CategoriesProducts,
        @InjectModel(Category) private categoriesModel: typeof Category
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

    async getCategoryByName(name: string): Promise<Category | null> {
        return await this.categoriesModel.findOne({
            where: { name }
        });
    }

    async create(dto: CreateCategoriesProductDto) {
        return await this.categoriesProductsRepository.create(dto);
    }
}
