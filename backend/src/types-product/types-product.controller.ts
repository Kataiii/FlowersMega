import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/auth/guards/decorators/roles-auth.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesAuthGuard } from 'src/auth/guards/roles-auth.guard';
import { CreateTypeProductDto } from './dto/createTypeProduct.dto';
import { TypeProduct } from './types-product.model';
import { TypesProductService } from './types-product.service';

@ApiTags("Types Product")
@Controller('types-product')
export class TypesProductController {
    constructor(private typesProductService : TypesProductService){}

    @ApiBearerAuth('access-token')
    @Roles("admin")
    @UseGuards(JwtAuthGuard, RolesAuthGuard)
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
