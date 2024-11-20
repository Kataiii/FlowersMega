import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
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

    async getAllProductsSizesByCategoryId(idCategory: number){
        return await this.categoriesProductsSizesRepository.findAll({
            where: {idCategory: idCategory}
        });
    }
}
