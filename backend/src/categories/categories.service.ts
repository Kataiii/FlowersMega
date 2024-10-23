import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { FilesService } from 'src/files/files.service';
import { Category } from './categories.model';
import { CreateCategoryDto } from './dto/createCategory.dto';

@Injectable()
export class CategoriesService {
    constructor(
        @InjectModel(Category) private categoryRepository: typeof Category,
        private filesService: FilesService) { }

    async onModuleInit() {
        await this.seeds();
    }

    async seeds() {
        const categories = [
            { name: 'Цветы в коробке' },
            { name: 'Букеты' },
            { name: 'Корзины с цветами' },
            { name: 'Розы' },
            { name: 'Открытки' },
            { name: 'Топперы' },
            { name: 'Мягкие игрушки' },
            { name: 'Шары' },
            { name: 'Комнатные цветы' }
        ];

        for (const category of categories) {
            await this.categoryRepository.findOrCreate({
                where: { name: category.name },
                defaults: category,
            });
        }
    }



    async create(dto: CreateCategoryDto, preview: File) {
        const categoty = await this.categoryRepository.create(dto);
        const fileName = await this.filesService.createImageCategory(preview);
        await this.categoryRepository.update({
            url: fileName
        }, { where: { id: categoty.id } });
        return await this.categoryRepository.findOne({ where: { id: categoty.id } });
    }

    async getAll() {
        const categories = await this.categoryRepository.findAll({
            order: [["name", "ASC"]]
        })
        if (categories.length === 0) throw new HttpException("Categories not fount", HttpStatus.NOT_FOUND);
        return categories;
    }

    async getById(id: number | string) {
        const category = await this.categoryRepository.findOne({ where: { id: id } });
        if (category === null) throw new HttpException("Category not found", HttpStatus.NOT_FOUND);
        return category;
    }

    async getAllCountAndPagination(page: number, limit: number) {
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

    async delete(id: number) {
        const category = await this.categoryRepository.findOne({ where: { id: id } });
        await this.categoryRepository.destroy({ where: { id: id } });
        return category;
    }


}
