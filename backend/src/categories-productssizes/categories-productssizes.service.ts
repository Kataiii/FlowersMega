import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Category } from 'src/categories/categories.model';
import { CategoriesProductsSizes } from './categories-productssizes.model';
import { CreateCategoriesProductSizeDto } from './dto/createCategoriesProductSize.dto';

@Injectable()
export class CategoriesProductssizesService {
    constructor(
        @InjectModel(CategoriesProductsSizes) private categoriesProductsSizesRepository: typeof CategoriesProductsSizes
    ) { }

    async create(dto: CreateCategoriesProductSizeDto) {
        return await this.categoriesProductsSizesRepository.create(dto);
    }

    async update(categories: Category[], productSizeId: number){
        const categoriesData = await this.categoriesProductsSizesRepository.findAll({where: {idProductSize: productSizeId}});
        const categoriesDublicates = categories.map(item => item.id).filter(item => categoriesData.map(item => item.idCategory).includes(item));
        categoriesData.forEach(async(item) => {
            if(!categoriesDublicates.find(el => el === item.idCategory)) await this.categoriesProductsSizesRepository.destroy({where: {id: item.id}});
        })

        categories.forEach(async(item) => {
            if(!categoriesDublicates.find(el => el === item.id)) await this.categoriesProductsSizesRepository.create({idCategory: item.id, idProductSize: productSizeId});
        })
    }

    async getAllProductsSizesByCategoryId(idCategory: number){
        return await this.categoriesProductsSizesRepository.findAll({
            where: {idCategory: idCategory}
        });
    }
}
