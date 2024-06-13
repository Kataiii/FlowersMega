import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { City } from 'src/cities/cities.model';
import { CreateFilterDto } from './dto/createFilter.dto';
import { Filter } from './filters.model';
import { FiltersService } from './filters.service';

@ApiTags("Filters")
@Controller('filters')
export class FiltersController {
    constructor(private filtersService : FiltersService){}

    @ApiOperation({summary: 'Create filter'})
    @ApiResponse({status: 201, type: Filter})
    @Post()
    async create(@Body()dto: CreateFilterDto){
        return await this.filtersService.create(dto);
    }

    @ApiOperation({summary: 'Get all filters'})
    @ApiResponse({status: 200, type: [Filter]})
    @ApiResponse({status: 404, description: "Filters not fount"})
    @Get()
    async getAll(){
        return await this.filtersService.getAll();
    }

    @ApiOperation({summary: 'Get filter by id'})
    @ApiResponse({status: 200, type: City})
    @ApiResponse({status: 404, description: "Filter not fount"})
    @Get("/:id")
    async getById(@Param("id") id: number){
        return await this.filtersService.getById(id);
    }
}
