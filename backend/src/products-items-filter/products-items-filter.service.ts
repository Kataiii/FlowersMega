import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateProductItemsFilterDto } from './dto/createProductItemsFilter.dto';
import { ProductsItemsFilter } from './products-items-filter.model';

@Injectable()
export class ProductsItemsFilterService {
    constructor(
        @InjectModel(ProductsItemsFilter) private productsItemsFilterRepository: typeof ProductsItemsFilter,
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

    async create(dto: CreateProductItemsFilterDto) {
        return await this.productsItemsFilterRepository.create(dto);
    }
}
