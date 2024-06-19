import { Controller, Get, Param } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { NUMBER } from 'sequelize';
import { CategoriesProductsService } from './categories-products.service';

@ApiTags("Categories Products")
@Controller('categories-products')
export class CategoriesProductsController {
    constructor(private categoriesProductsService : CategoriesProductsService){}

    @ApiOperation({summary: 'Get count products by category id'})
    @ApiResponse({status: 200, type: NUMBER})
    @Get("/count/:id")
    async getAll(@Param("id") id: number){
        return await this.categoriesProductsService.getByCategoryIdCount(id);
    }
}
