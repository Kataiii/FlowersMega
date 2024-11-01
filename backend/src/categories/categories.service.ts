import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { FilesService } from 'src/files/files.service';
import { Category } from './categories.model';
import { CreateCategoryDto } from './dto/createCategory.dto';
import { CustomFile } from 'src/products-sizes/products-sizes-full.service';
import * as fs from 'fs';
import fetch from 'node-fetch';
import path from 'path';
@Injectable()
export class CategoriesService {
    constructor(
        @InjectModel(Category) private categoryRepository: typeof Category,
        private filesService: FilesService) { }

    async onModuleInit() {
        const filePath = '../backend/static/products/CATEGORIES.txt';
        await this.seeds(filePath);
    }


    async seeds(filePath: string): Promise<void> {
        const fileContent = fs.readFileSync(filePath, 'utf-8');
        const lines = fileContent.split('\n');
        let index = 0;

        for (const line of lines) {
            const [categoryName, imageUrl] = line.split(';');

            if (!categoryName || !imageUrl) {
                console.log(`Invalid line format: ${line}`);
                continue;
            }

            const fileBuffer = fs.readFileSync(imageUrl);
            await this.create({ name: categoryName.trim() }, new CustomFile(fileBuffer, `${categoryName.trim()}.jpg`, "image/jpeg"));

            // try {

            //     const fileBuffer = await fetch(imageUrl.trim())
            //         .then(response => {
            //             if (!response.ok) throw new Error(`Failed to fetch image: ${response.statusText}`);
            //             return response.arrayBuffer();
            //         })
            //         .then(arrayBuffer => Buffer.from(arrayBuffer))
            //         .then(buffer => new CustomFile(buffer, `${categoryName.trim()}.jpg`, "image/jpeg"));
            //     console.log(fileBuffer, "CATEGORY PHOTO")

            //     await this.create({ name: categoryName.trim() }, fileBuffer);

            //     console.log(`Category "${categoryName.trim()}" processed successfully.`);
            // } catch (error) {
            //     console.error(`Error processing category "${categoryName.trim()}":`, error);
            // }
        }
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
