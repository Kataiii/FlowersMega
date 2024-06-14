import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Category } from './categories.model';
import { CreateCategoryDto } from './dto/createCategory.dto';

@Injectable()
export class CategoriesService {
    constructor(@InjectModel(Category) private categoryRepository: typeof Category){}

    async create(dto: CreateCategoryDto){
        return await this.categoryRepository.create(dto);
    }

    async getAll(){
        const categories = await this.categoryRepository.findAll({
            order: [["name", "ASC"]]
        })
        if(categories.length === 0) throw new HttpException("Categories not fount", HttpStatus.NOT_FOUND);
        return categories;
    }

    async getById(id: number | string){
        const category = await this.categoryRepository.findOne({where: {id: id}});
        if(category === null) throw new HttpException("Category not found", HttpStatus.NOT_FOUND);
        return category;
    }
}
