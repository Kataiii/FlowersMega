import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/auth/guards/decorators/roles-auth.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesAuthGuard } from 'src/auth/guards/roles-auth.guard';
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

    @ApiBearerAuth('access-token')
    @Roles("admin")
    @UseGuards(JwtAuthGuard, RolesAuthGuard)
    @ApiOperation({summary: 'Cretae relation product with item filter'})
    @ApiResponse({status: 201, type: ProductsItemsFilter})
    @Post()
    async create(@Body() dto: CreateProductItemsFilterDto){
        return await this.productsItemsFilter.create(dto);
    }
}
