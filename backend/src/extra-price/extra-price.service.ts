import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { ExtraPrice } from './extra-price.model';
import { CategoriesProducts } from 'src/categories-products/categories_products.model';
import { Op } from 'sequelize';

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
        return this.extraPriceRepository.findOne({
            where: { idCategory },
        });
    }

    async deleteByCategoryId(idCategory: string) {
        console.log(idCategory, "IN SERVICE deleteByCategoryId");
        return await this.extraPriceRepository.destroy({
            where: { idCategory }
        });
    }

    async whichOneTheBest() {
        const generalExtra = await this.extraPriceRepository.findOne({
            where: { idCategory: 'all' }
        })
        const otherCategoriesExtras = await this.extraPriceRepository.findAll({
            where: { idCategory: { [Op.ne]: 'all' } }
        })

        const resultMap = otherCategoriesExtras.reduce((map, item) => {
            const existingValue = map.get(item.idCategory) || generalExtra.value;
            const maxValue = Math.max(existingValue, item.value);
            map.set(item.idCategory, maxValue);

            return map;
        }, new Map([[generalExtra.idCategory, generalExtra.value]]));
        console.log(resultMap, "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA");
        return resultMap;
    }

}

