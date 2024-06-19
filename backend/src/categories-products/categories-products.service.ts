import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CategoriesProducts } from './categories_products.model';

@Injectable()
export class CategoriesProductsService {
    constructor(
        @InjectModel(CategoriesProducts) private categoriesProductsRepository: typeof CategoriesProducts,
    ){}

    async getByCategoryIdCount(id: number){
        const categories = await this.categoriesProductsRepository.findAndCountAll({
            where: {idCategory: id}
        });
        return categories.count;
    }
}
