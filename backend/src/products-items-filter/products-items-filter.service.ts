import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateProductItemsFilterDto } from './dto/createProductItemsFilter.dto';
import { ProductsItemsFilter } from './products-items-filter.model';
import { ItemFilter } from 'src/items-filter/items-filter.model';
import { Op } from 'sequelize';

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

    async getProductsByFilterIdArray(ids: number[]) {
        console.log("tmp ", ids);
        const filters = await this.productsItemsFilterRepository.findAll({
            where: { idItemFilter: {
                [Op.in]: ids
              } 
            }
        })
        console.log("Filters ", filters)
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

    async update(filters: ItemFilter[], productId: number){
        const filtersData = await this.productsItemsFilterRepository.findAll({where: {idProduct: productId}});
        const filtersDublicates = filters.map(item => item.id).filter(item => filtersData.map(item => item.idItemFilter).includes(item));
        await Promise.all(filtersData.map(async(item) => {
            if(!filtersDublicates.find(el => el === item.idItemFilter)) await this.productsItemsFilterRepository.destroy({where: {id: item.id}});
        }))
        await Promise.all(filters.map(async(item) => {
            console.log("item ", item.id);
            if(!filtersDublicates.find(el => el === item.id)) await this.productsItemsFilterRepository.create({idItemFilter: item.id, idProduct: productId});
        }))
    }
}
