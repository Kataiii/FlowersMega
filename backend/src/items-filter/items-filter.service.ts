import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateItemFilterDto } from './dto/createItemFilter.dto';
import { ItemFilter } from './items-filter.model';

@Injectable()
export class ItemsFilterService {
    constructor(@InjectModel(ItemFilter) private itemFilterRepository: typeof ItemFilter){}

    async create(dto: CreateItemFilterDto){
        return await this.itemFilterRepository.create(dto);
    }

    async getAll(){
        const itemsFilters = await this.itemFilterRepository.findAll({
            order: [["name", "ASC"]]
        })
        if(itemsFilters.length === 0) throw new HttpException("Items filters not fount", HttpStatus.NOT_FOUND);
        return itemsFilters;
    }

    async getById(id: number | string){
        const itemFilter = await this.itemFilterRepository.findOne({where: {id: id}});
        if(itemFilter === null) throw new HttpException("Item filter not found", HttpStatus.NOT_FOUND);
        return itemFilter;
    }

    async getAllByIdFilter(idFilter: number){
        const itemsFilters = await this.itemFilterRepository.findAll({
            where: {idFilter: idFilter},
            order: [["name", "ASC"]]
        })
        if(itemsFilters.length === 0) throw new HttpException("Items filters not fount", HttpStatus.NOT_FOUND);
        return itemsFilters;
    }

    async delete(id: number){
        const itemFilter = await this.itemFilterRepository.findOne({where: {id: id}});
        await this.itemFilterRepository.destroy({where: {id: id}});
        return itemFilter;
    }
}
