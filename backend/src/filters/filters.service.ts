import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { ProductsSizesService } from 'src/products-sizes/products-sizes.service';
import { CreateFilterDto } from './dto/createFilter.dto';
import { Filter } from './filters.model';

@Injectable()
export class FiltersService {
    constructor(@InjectModel(Filter) private filterRepository: typeof Filter,
        private productsSizesService: ProductsSizesService){}

    async create(dto: CreateFilterDto){
        return await this.filterRepository.create(dto);
    }

    async getAll(){
        const filters = await this.filterRepository.findAll({
            order: [["name", "ASC"]],
            include: [{all: true}]
        })
        if(filters.length === 0) throw new HttpException("Filters not fount", HttpStatus.NOT_FOUND);
        return filters;
    }

    async getById(id: number | string){
        const filter = await this.filterRepository.findOne({where: {id: id}});
        if(filter === null) throw new HttpException("Filter not found", HttpStatus.NOT_FOUND);
        return filter;
    }

    async getAllFIltersWithMAxPrice(){
        const filters = await this.filterRepository.findAll({
            order: [["name", "ASC"]],
            include: [{all: true}]
        });
        if(filters.length === 0) throw new HttpException("Filters not fount", HttpStatus.NOT_FOUND);
        const maxPrice = await this.productsSizesService.getMaxPrice();
        return {
            maxPrice: maxPrice,
            filters: filters
        };
    }
}
