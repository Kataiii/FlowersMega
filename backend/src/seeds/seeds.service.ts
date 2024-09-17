import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import { FiltersService } from 'src/filters/filters.service';
import { CreateItemFilterDto } from 'src/items-filter/dto/createItemFilter.dto';
import { ItemsFilterService } from 'src/items-filter/items-filter.service';

@Injectable()
export class SeedsService {
    constructor(
        private filtersService: FiltersService,
        private itemsFilterService: ItemsFilterService
    ){}

    async createAllSeeds(){
        let filePath = path.resolve(__dirname, '..', '..', process.env.SEED_FILE, "seeds.json");
        const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
        console.log(data.filters);
        return "Seeds!!!";
    }

    async filtersSeed(){
        let filePath = path.resolve(__dirname, '..', '..', process.env.SEED_FILE, "seeds.json");
        const data: string[] = JSON.parse(fs.readFileSync(filePath, 'utf8')).filters;
        Promise.all(data.map( async(element) => {
            await this.filtersService.create({ name: element });
        }));
        return "Filters seeds success";
    }

    async filtersItemsSeed(){
        let filePath = path.resolve(__dirname, '..', '..', process.env.SEED_FILE, "seeds.json");
        const data: CreateItemFilterDto[] = JSON.parse(fs.readFileSync(filePath, 'utf8')).filters_items;
        Promise.all(data.map( async(element) => {
            await this.itemsFilterService.create({ name: element.name, idFilter: element.idFilter });
        }));
        return "Items filters seeds success";
    }
}
