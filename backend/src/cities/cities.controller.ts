import { Controller, Get, Param } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { City } from './cities.model';
import { CitiesService } from './cities.service';

@ApiTags("Cities")
@Controller('cities')
export class CitiesController {
    constructor(private citiesService : CitiesService){}

    @ApiOperation({summary: 'Get all cities'})
    @ApiResponse({status: 200, type: [City]})
    @ApiResponse({status: 404, description: "Cities not fount"})
    @Get()
    async getAll(){
        return await this.citiesService.getAll();
    }

    @ApiOperation({summary: 'Get city by id'})
    @ApiResponse({status: 200, type: City})
    @ApiResponse({status: 404, description: "City not fount"})
    @Get("/:id")
    async getById(@Param("id") id: number){
        return await this.citiesService.getById(id);
    }
}
