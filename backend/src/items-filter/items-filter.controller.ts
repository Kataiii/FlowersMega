import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateItemFilterDto } from './dto/createItemFilter.dto';
import { DeleteItemFilterDto } from './dto/deleteItemFIlter.dto';
import { ItemFilter } from './items-filter.model';
import { ItemsFilterService } from './items-filter.service';

@ApiTags("Items Filter")
@Controller('items-filter')
export class ItemsFilterController {
    constructor(private itemsFilterService : ItemsFilterService){}

    @ApiOperation({summary: 'Create item filter'})
    @ApiResponse({status: 201, type: ItemFilter})
    @Post()
    async create(@Body()dto: CreateItemFilterDto){
        return await this.itemsFilterService.create(dto);
    }

    @ApiOperation({summary: 'Get all items filters'})
    @ApiResponse({status: 200, type: [ItemFilter]})
    @ApiResponse({status: 404, description: "Items filters not fount"})
    @Get()
    async getAll(){
        return await this.itemsFilterService.getAll();
    }

    @ApiOperation({summary: 'Get items filter by id'})
    @ApiResponse({status: 200, type: ItemFilter})
    @ApiResponse({status: 404, description: "Item Filter not fount"})
    @Get("/:id")
    async getById(@Param("id") id: number){
        return await this.itemsFilterService.getById(id);
    }

    @ApiOperation({summary: 'Get items filter by id'})
    @ApiResponse({status: 200, type: [ItemFilter]})
    @ApiResponse({status: 404, description: "Item Filter not fount"})
    @Get("/filter/:id")
    async getByFilterId(@Param("id") id: number){
        return await this.itemsFilterService.getAllByIdFilter(id);
    }

    @ApiOperation({summary: 'Delete item filter by id'})
    @ApiResponse({status: 200, type: [ItemFilter]})
    @Delete()
    async delete(@Body() dto:DeleteItemFilterDto){
        return await this.itemsFilterService.delete(dto.id);
    }
}
