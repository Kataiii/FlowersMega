import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateProductItemsFilterDto } from './dto/createProductItemsFilter.dto';
import { ProductsItemsFilter } from './products-items-filter.model';
import { ProductsItemsFilterService } from './products-items-filter.service';

@ApiTags('Product Items Filter')
@Controller('products-items-filter')
export class ProductsItemsFilterController {
    constructor(private productsItemsFilter : ProductsItemsFilterService){}

    // @ApiOperation({summary: 'Get count products by category id'})
    // @ApiResponse({status: 200, type: NUMBER})
    // @Get("/count/:id")
    // async getAll(@Param("id") id: number){
    //     return await this.categoriesProductsService.getByCategoryIdCount(id);
    // }

    @ApiOperation({summary: 'Cretae relation product with item filter'})
    @ApiResponse({status: 201, type: ProductsItemsFilter})
    @Post()
    async create(@Body() dto: CreateProductItemsFilterDto){
        return await this.productsItemsFilter.create(dto);
    }
}
