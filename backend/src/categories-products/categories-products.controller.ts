import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { NUMBER } from 'sequelize';
import { CategoriesProductsService } from './categories-products.service';
import { CategoriesProducts } from './categories_products.model';
import { CreateCategoriesProductDto } from './dto/createCategoriesProduct.dto';

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

    @ApiOperation({summary: 'Cretae relation product with category'})
    @ApiResponse({status: 201, type: CategoriesProducts})
    @Post()
    async create(@Body() dto: CreateCategoriesProductDto){
        return await this.categoriesProductsService.create(dto);
    }
}
