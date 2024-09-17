import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { STRING } from 'sequelize';
import { SeedsService } from './seeds.service';

@ApiTags("Seed")
@Controller('seeds')
export class SeedsController {
    constructor(private seedsService: SeedsService){}

    @ApiOperation({summary: 'Create seeds'})
    @ApiResponse({status: 200, type: STRING})
    @ApiResponse({status: 404, description: "Sizes not fount"})
    @Get()
    async createSeed(){
        if(process.env.SEED){
            return await this.seedsService.createAllSeeds();
        }
        else {
            return "Seeds not found";
        }
    }

    @ApiOperation({summary: 'Create seeds filters'})
    @ApiResponse({status: 200, type: STRING})
    @ApiResponse({status: 404, description: "Sizes not fount"})
    @Get("/filters")
    async createFiltersSeed(){
        if(process.env.SEED){
            return await this.seedsService.filtersSeed();
        }
        else {
            return "Seeds not found";
        }
    }

    @ApiOperation({summary: 'Create seeds filters items'})
    @ApiResponse({status: 200, type: STRING})
    @ApiResponse({status: 404, description: "Sizes not fount"})
    @Get("/filters-items")
    async createItemsFiltersSeed(){
        if(process.env.SEED){
            return await this.seedsService.filtersItemsSeed();
        }
        else {
            return "Seeds not found";
        }
    }
}
