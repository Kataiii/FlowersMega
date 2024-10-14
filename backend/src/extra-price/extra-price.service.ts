import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { ExtraPrice } from './extra-price.model';
import { CategoriesProducts } from 'src/categories-products/categories_products.model';

@Injectable()
export class ExtraPriceService {
    constructor(
        @InjectModel(ExtraPrice) private extraPriceRepository: typeof ExtraPrice,
        @InjectModel(CategoriesProducts) private categoriesProductsRepository: typeof CategoriesProducts,
    ) { }

    async create(dto: ExtraPrice) {
        const { id, ...restDto } = dto;
        const [extraPrice, created] = await this.extraPriceRepository.findOrCreate({
            where: { idCategory: restDto.idCategory },
            defaults: restDto
        });

        if (!created) {
            extraPrice.value = restDto.value;
            await extraPrice.save();
        }

        return extraPrice;
    }

    async getAll() {
        return this.extraPriceRepository.findAll();
    }

    async getById(id: number) {
        return this.extraPriceRepository.findByPk(id);
    }

    async getByCategoryId(idCategory: string) {
        console.log(idCategory, "HAHAHAH");
        return this.extraPriceRepository.findAll({
            where: { idCategory },
        });
    }

    async deleteByCategoryId(idCategory: string) {
        return this.extraPriceRepository.destroy({
            where: { idCategory }
        });

    }

}

