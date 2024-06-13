import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateFilterDto } from './dto/createFilter.dto';
import { Filter } from './filters.model';

@Injectable()
export class FiltersService {
    constructor(@InjectModel(Filter) private filterRepository: typeof Filter){}

    async create(dto: CreateFilterDto){
        return await this.filterRepository.create(dto);
    }

    async getAll(){
        const filters = await this.filterRepository.findAll({
            order: [["name", "ASC"]]
        })
        if(filters.length === 0) throw new HttpException("Filters not fount", HttpStatus.NOT_FOUND);
        return filters;
    }

    async getById(id: number | string){
        const filter = await this.filterRepository.findOne({where: {id: id}});
        if(filter === null) throw new HttpException("Filter not found", HttpStatus.NOT_FOUND);
        return filter;
    }
}
