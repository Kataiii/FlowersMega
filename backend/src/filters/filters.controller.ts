import { Body, Controller, Delete, Get, Param, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/auth/guards/decorators/roles-auth.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesAuthGuard } from 'src/auth/guards/roles-auth.guard';
import { City } from 'src/cities/cities.model';
import { CreateFilterDto } from './dto/createFilter.dto';
import { DeleteFilterDto } from './dto/deleteFilter.dto';
import { FiltersMaxPriceDto } from './dto/filtersAndMaxPrice.dto';
import { Filter } from './filters.model';
import { FiltersService } from './filters.service';

@ApiTags("Filters")
@Controller('filters')
export class FiltersController {
    constructor(private filtersService: FiltersService) { }

    @ApiBearerAuth('access-token')
    @Roles("admin")
    @UseGuards(JwtAuthGuard, RolesAuthGuard)
    @ApiOperation({ summary: 'Create filter' })
    @ApiResponse({ status: 201, type: Filter })
    @Post()
    async create(@Body() dto: CreateFilterDto) {
        return await this.filtersService.create(dto);
    }

    @ApiOperation({ summary: 'Get all filters' })
    @ApiResponse({ status: 200, type: [Filter] })
    @ApiResponse({ status: 404, description: "Filters not fount" })
    @Get()
    async getAll() {
        return await this.filtersService.getAll();
    }

    @ApiOperation({ summary: 'Get all filters and max price' })
    @ApiResponse({ status: 200, type: FiltersMaxPriceDto })
    @Get('/filters-with-price/:id?')
    async getFiltersWithMaxPrice(@Param('id') idCategory?: number) {
        return await this.filtersService.getAllFIltersWithMAxPrice(idCategory);
    }

    @ApiOperation({ summary: 'Get filter by id' })
    @ApiResponse({ status: 200, type: City })
    @ApiResponse({ status: 404, description: "Filter not fount" })
    @Get("/:id")
    async getById(@Param("id") id: number) {
        return await this.filtersService.getById(id);
    }

    @ApiBearerAuth('access-token')
    @Roles("admin")
    @UseGuards(JwtAuthGuard, RolesAuthGuard)
    @ApiOperation({ summary: "Delete filter by id" })
    @ApiResponse({ status: 200, type: Filter })
    @Delete()
    async delete(@Body() dto: DeleteFilterDto) {
        return await this.filtersService.delete(dto.id);
    }
}
