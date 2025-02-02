import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CategoriesProducts } from './categories_products.model';
import { CreateCategoriesProductDto } from './dto/createCategoriesProduct.dto';
import { Category } from 'src/categories/categories.model';
import { Op, Sequelize } from 'sequelize';

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

    async getCategoryByName(name: string) {
        const category = await this.categoriesModel.findOne({
            where: { name }
        });

        if (!category) {
            console.log('Category not found:', name);
            return null;
        }

        return category;
    }

    async getSearchCategoryByName(name: string) {
        const category = await this.categoriesModel.findAll({
            where: Sequelize.where(
                Sequelize.fn('LOWER', Sequelize.col('name')),
                {
                    [Op.like]: `%${name.toLowerCase()}%`
                }
            )
        });
        return category;
    }


    async getTopCategories(limit: number = 5) {
        return await this.categoriesModel.findAll({
            limit,
        });
    }

    async create(dto: CreateCategoriesProductDto) {
        return await this.categoriesProductsRepository.create(dto);
    }

    async update(categories: Category[], productId: number){
        const categoriesData = await this.categoriesProductsRepository.findAll({where: {idProduct: productId}});
        const categoriesDublicates = categories.map(item => item.id).filter(item => categoriesData.map(item => item.idCategory).includes(item));
        
        categoriesData.forEach(async(item) => {
            if(!categoriesDublicates.find(el => el === item.idCategory)) await this.categoriesProductsRepository.destroy({where: {id: item.id}});
        })

        categories.forEach(async(item) => {
            if(!categoriesDublicates.find(el => el === item.id)) await this.categoriesProductsRepository.create({idCategory: item.id, idProduct: productId});
        })
    }
}
