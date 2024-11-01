import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateProductItemsFilterDto } from './dto/createProductItemsFilter.dto';
import { ProductsItemsFilter } from './products-items-filter.model';
import { ItemFilter } from 'src/items-filter/items-filter.model';

@Injectable()
export class ProductsItemsFilterService {
    constructor(
        @InjectModel(ProductsItemsFilter) private productsItemsFilterRepository: typeof ProductsItemsFilter,
        @InjectModel(ItemFilter) private itemFilterRepository: typeof ItemFilter,
    ) { }

    // async getByCategoryIdCount(id: number){
    //     const categories = await this.categoriesProductsRepository.findAndCountAll({
    //         where: {idCategory: id}
    //     });
    //     return categories.count;
    // }
    async getProductsByFilterId(id: number) {
        const filters = await this.productsItemsFilterRepository.findAll({
            where: { idItemFilter: id }
        })
        return filters;
    }


    async getItemFilterByName(name: string) {
        const itemFilter = await this.itemFilterRepository.findOne({
            where: { name }
        });

        if (!itemFilter) {
            console.log('Item filter not found:', name);
            return null;
        }

        // console.log(itemFilter, "ITEM FILTER OBJECT");
        return itemFilter;
    }


    async create(dto: CreateProductItemsFilterDto) {
        return await this.productsItemsFilterRepository.create(dto);
    }
}
