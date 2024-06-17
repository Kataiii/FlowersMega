import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateProductDto } from './dto/createProduct.dto';
import { Product } from './products.model';
import { ProductsService } from './products.service';

@ApiTags("Products")
@Controller('products')
export class ProductsController {
    constructor(private productsService : ProductsService){}

    @ApiOperation({summary: 'Create product'})
    @ApiResponse({status: 201, type: Product})
    @Post()
    async create(@Body()dto: CreateProductDto){
        return await this.productsService.create(dto);
    }

    @ApiOperation({summary: 'Get all products'})
    @ApiResponse({status: 200, type: [Product]})
    @ApiResponse({status: 404, description: "Products not fount"})
    @Get()
    async getAll(){
        return await this.productsService.getAll();
    }

    @ApiOperation({summary: 'Get product by id'})
    @ApiResponse({status: 200, type: Product})
    @ApiResponse({status: 404, description: "Product not fount"})
    @Get("/:id")
    async getById(@Param("id") id: number){
        return await this.productsService.getById(id);
    }
}
