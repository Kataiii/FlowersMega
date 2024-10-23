import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { ProductsSizesService } from 'src/products-sizes/products-sizes.service';
import { CreateFilterDto } from './dto/createFilter.dto';
import { Filter } from './filters.model';
import { ProductsSizesFullService } from 'src/products-sizes/products-sizes-full.service';

@Injectable()
export class FiltersService {
    constructor(@InjectModel(Filter) private filterRepository: typeof Filter,
        private productsSizesService: ProductsSizesService,
        private productSizesFullService: ProductsSizesFullService
    ) { }

    async onModuleInit() {
        await this.seeds();
    }

    async seeds() {
        const filters = [
            { name: 'Повод' },
            { name: 'Кому' }
        ];

        for (const filter of filters) {
            await this.filterRepository.findOrCreate({
                where: { name: filter.name },
                defaults: filter,
            });
        }
    }



    async create(dto: CreateFilterDto) {
        return await this.filterRepository.create(dto);
    }

    async getAll() {
        const filters = await this.filterRepository.findAll({
            order: [["name", "ASC"]],
            include: [{ all: true }]
        })
        if (filters.length === 0) throw new HttpException("Filters not fount", HttpStatus.NOT_FOUND);
        return filters;
    }

    async getById(id: number | string) {
        const filter = await this.filterRepository.findOne({ where: { id: id } });
        if (filter === null) throw new HttpException("Filter not found", HttpStatus.NOT_FOUND);
        return filter;
    }

    async getAllFIltersWithMAxPrice(idCategory?: number) {
        console.log(idCategory, "CHECK CATEGORY");
        const filters = await this.filterRepository.findAll({
            order: [["name", "ASC"]],
            include: [{ all: true }]
        });
        if (filters.length === 0) throw new HttpException("Filters not fount", HttpStatus.NOT_FOUND);
        const maxPrice = await this.productSizesFullService.getMaxPrice(idCategory);
        console.log(maxPrice, "SHOUD BE");
        return {
            maxPrice: maxPrice,
            filters: filters
        };
    }

    async delete(id: number) {
        const filter = await this.filterRepository.findOne({ where: { id: id } });
        await this.filterRepository.destroy({ where: { id: id } });
        return filter;
    }
}
