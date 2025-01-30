import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { FilesService } from 'src/files/files.service';
import { Category } from './categories.model';
import { CreateCategoryDto } from './dto/createCategory.dto';
import { CustomFile } from 'src/products-sizes/products-sizes-full.service';
import * as fs from 'fs';
import fetch from 'node-fetch';
import * as path from 'path';
@Injectable()
export class CategoriesService {
    constructor(
        @InjectModel(Category) private categoryRepository: typeof Category,
        private filesService: FilesService) { }

    // async onModuleInit() {
    //     const filePath = '../backend/static/products/CATEGORIES.txt';
    //     await this.seeds(filePath);
    // }

    async seeds(filePath: string): Promise<void> {
        const fileContent = fs.readFileSync(filePath, 'utf-8');
        const lines = fileContent.split('\n');
        let index = 0;

        for (let i: number = 0; i < lines.length; i++) {
            const [categoryName, imageUrl] = lines[i].split(';');
            if (!categoryName || !imageUrl) {
                console.log(`Invalid line format: ${lines[i]}`);
            }
            else {
                try {
                    const fileBuffer = fs.readFileSync(path.resolve(__dirname, "..", '..', 'static', 'products', 'categories', `flowers${index + 1}.jpg`));
                    await this.create({ name: categoryName.trim() }, new CustomFile(fileBuffer, `${categoryName.trim()}.jpg`, "image/jpeg"));
                }
                catch (e) {
                    console.log(e);
                }
            }
        };
    }


    async create(dto: CreateCategoryDto, preview: File) {
        const category = await this.categoryRepository.create(dto);
        const fileName = await this.filesService.createImageCategory(preview, category.id.toString());
        await this.categoryRepository.update({
            url: fileName
        }, { where: { id: category.id } });
        return await this.categoryRepository.findOne({ where: { id: category.id } });
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
