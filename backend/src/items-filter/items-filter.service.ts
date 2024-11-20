import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateItemFilterDto } from './dto/createItemFilter.dto';
import { ItemFilter } from './items-filter.model';

@Injectable()
export class ItemsFilterService {
    constructor(@InjectModel(ItemFilter) private itemFilterRepository: typeof ItemFilter) { }

    // async onModuleInit() {
    //     await this.seeds();
    // }


    async seeds() {
        const itemFilters = [
            { name: 'День рождения', idFilter: 1 },
            { name: '8 марта', idFilter: 1 },
            { name: 'Извинения', idFilter: 1 },
            { name: 'На 9 мая', idFilter: 1 },
            { name: 'В роддом', idFilter: 1 },
            { name: '1 сентября', idFilter: 1 },
            { name: 'На свадьбу', idFilter: 1 },
            { name: '14 февраля', idFilter: 1 },
            { name: 'На юбилей', idFilter: 1 },
            { name: 'Сказать люблю', idFilter: 1 },
            { name: 'Цветы на день матери', idFilter: 2 },
            { name: 'Цветы жене', idFilter: 2 },
            { name: 'Цветы врачу', idFilter: 2 },
            { name: 'Цветы коллеге', idFilter: 2 },
            { name: 'Цветы любимой', idFilter: 2 },
            { name: 'Цветы ребёнку', idFilter: 2 },
        ];

        for (const itemFilter of itemFilters) {
            await this.itemFilterRepository.findOrCreate({
                where: { name: itemFilter.name, idFilter: itemFilter.idFilter },
                defaults: itemFilter,
            });
        }
    }

    async create(dto: CreateItemFilterDto) {
        return await this.itemFilterRepository.create(dto);
    }

    async getAll() {
        const itemsFilters = await this.itemFilterRepository.findAll({
            order: [["name", "ASC"]]
        })
        if (itemsFilters.length === 0) throw new HttpException("Items filters not fount", HttpStatus.NOT_FOUND);
        return itemsFilters;
    }

    async getById(id: number | string) {
        const itemFilter = await this.itemFilterRepository.findOne({ where: { id: id } });
        if (itemFilter === null) throw new HttpException("Item filter not found", HttpStatus.NOT_FOUND);
        return itemFilter;
    }

    async getAllByIdFilter(idFilter: number) {
        const itemsFilters = await this.itemFilterRepository.findAll({
            where: { idFilter: idFilter },
            order: [["name", "ASC"]]
        })
        if (itemsFilters.length === 0) throw new HttpException("Items filters not fount", HttpStatus.NOT_FOUND);
        return itemsFilters;
    }

    async getByName(name: string) {
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

    async delete(id: number) {
        const itemFilter = await this.itemFilterRepository.findOne({ where: { id: id } });
        await this.itemFilterRepository.destroy({ where: { id: id } });
        return itemFilter;
    }
}
