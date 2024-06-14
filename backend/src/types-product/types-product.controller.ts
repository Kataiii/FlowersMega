import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateTypeProductDto } from './dto/createTypeProduct.dto';
import { TypeProduct } from './types-product.model';
import { TypesProductService } from './types-product.service';

@ApiTags("Types Product")
@Controller('types-product')
export class TypesProductController {
    constructor(private typesProductService : TypesProductService){}

    @ApiOperation({summary: 'Create type product'})
    @ApiResponse({status: 201, type: TypeProduct})
    @Post()
    async create(@Body()dto: CreateTypeProductDto){
        return await this.typesProductService.create(dto);
    }

    @ApiOperation({summary: 'Get all types product'})
    @ApiResponse({status: 200, type: [TypeProduct]})
    @ApiResponse({status: 404, description: "Types product not fount"})
    @Get()
    async getAll(){
        return await this.typesProductService.getAll();
    }

    @ApiOperation({summary: 'Get type product by id'})
    @ApiResponse({status: 200, type: TypeProduct})
    @ApiResponse({status: 404, description: "Type Product not fount"})
    @Get("/:id")
    async getById(@Param("id") id: number){
        return await this.typesProductService.getById(id);
    }
}
