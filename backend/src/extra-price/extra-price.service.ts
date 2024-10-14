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
        const [extraPrice, created] = await this.extraPriceRepository.findOrCreate({
            where: { id: dto.id },
            defaults: dto
        });
        if (!created) {
            extraPrice.value = dto.value;
            await extraPrice.save();
        }
        return extraPrice;
    }
}
