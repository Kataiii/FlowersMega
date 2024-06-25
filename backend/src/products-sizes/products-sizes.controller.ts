import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateProductSizeDto, CreateProductSizeInfoDto } from './dto/createProductsSizes.dto';
import { GetPaginationProductSizeDto } from './dto/getPagination.dto';
import { ProductSize } from './products-sizes.model';
import { ProductsSizesService } from './products-sizes.service';

@ApiTags("Products Sizes")
@Controller('products-sizes')
export class ProductsSizesController {
    constructor(private productsSizesService : ProductsSizesService){}

    @ApiOperation({summary: 'Create product size'})
    @ApiResponse({status: 201, type: ProductSize})
    @Post()
    async create(@Body()dto: CreateProductSizeDto){
        return await this.productsSizesService.create(dto);
    }

    @ApiOperation({summary: 'Get all products sizes'})
    @ApiResponse({status: 200, type: [ProductSize]})
    @ApiResponse({status: 404, description: "Products sizes not fount"})
    @Get()
    async getAll(){
        return await this.productsSizesService.getAll();
    }

    @ApiOperation({summary: 'Get categories with pagination'})
    @ApiResponse({status: 200, type: GetPaginationProductSizeDto})
    @Get('/pagination/:page/:limit')
    async getPagination(@Param("page") page: number, @Param("limit") limit: number){
        return await this.productsSizesService.getAllWithPagination(page, limit);
    }

    @ApiOperation({summary: 'Get product size by id'})
    @ApiResponse({status: 200, type: ProductSize})
    @ApiResponse({status: 404, description: "Product size not fount"})
    @Get("/:id")
    async getById(@Param("id") id: number){
        return await this.productsSizesService.getById(id);
    }

    @ApiOperation({summary: 'Get product sizes by product id'})
    @ApiResponse({status: 200, type: [ProductSize]})
    @ApiResponse({status: 404, description: "Products sizes not fount"})
    @Get("/product/:id")
    async getByProductId(@Param("id") id: number){
        return await this.productsSizesService.getByProductId(id);
    }
}
