import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { FilesService } from 'src/files/files.service';
import { Category } from './categories.model';
import { CreateCategoryDto } from './dto/createCategory.dto';

@Injectable()
export class CategoriesService {
    constructor(
        @InjectModel(Category) private categoryRepository: typeof Category,
        private filesService: FilesService){}

    async create(dto: CreateCategoryDto, preview: File){
        const categoty = await this.categoryRepository.create(dto);
        const fileName = await this.filesService.createImageCategory(preview);
        await this.categoryRepository.update({
            url: fileName
        }, {where: {id: categoty.id}});
        return await this.categoryRepository.findOne({where: {id: categoty.id}});
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

    async getAllCountAndPagination(page: number, limit: number){
        const count = (await this.categoryRepository.findAndCountAll()).count;
        const categories = await this.categoryRepository.findAll({
            limit: limit,
            offset: (page - 1) * limit
        })
        return {
            count: count,
            categories: categories
        };
    }

    async delete(id: number){
        const category = await this.categoryRepository.findOne({where: {id: id}});
        await this.categoryRepository.destroy({where: {id: id}});
        return category;
    }
}
