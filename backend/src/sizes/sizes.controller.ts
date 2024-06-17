import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateSizeDto } from './dto/createSize.dto';
import { Size } from './sizes.model';
import { SizesService } from './sizes.service';

@ApiTags("Sizes")
@Controller('sizes')
export class SizesController {
    constructor(private sizesService : SizesService){}

    @ApiOperation({summary: 'Create size'})
    @ApiResponse({status: 201, type: Size})
    @Post()
    async create(@Body()dto: CreateSizeDto){
        return await this.sizesService.create(dto);
    }

    @ApiOperation({summary: 'Get all sizes'})
    @ApiResponse({status: 200, type: [Size]})
    @ApiResponse({status: 404, description: "Sizes not fount"})
    @Get()
    async getAll(){
        return await this.sizesService.getAll();
    }

    @ApiOperation({summary: 'Get size by id'})
    @ApiResponse({status: 200, type: Size})
    @ApiResponse({status: 404, description: "Size not fount"})
    @Get("/:id")
    async getById(@Param("id") id: number){
        return await this.sizesService.getById(id);
    }
}
