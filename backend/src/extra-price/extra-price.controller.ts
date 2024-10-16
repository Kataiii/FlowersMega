import { BadRequestException, Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ExtraPriceService } from './extra-price.service';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ExtraPrice } from './extra-price.model';

@ApiTags('ExtraPrice')
@Controller('extra-price')
export class ExtraPriceController {
    constructor(private extraPriceService: ExtraPriceService) { }

    @ApiOperation({ summary: 'Create extra price' })
    @ApiResponse({ status: 201, description: 'Extra price created' })
    @ApiResponse({ status: 400, description: 'Bad request' })
    @Post()
    async create(@Body() dto: ExtraPrice) {
        try {
            return await this.extraPriceService.create(dto);
        } catch (error) {
            throw new BadRequestException(error.message);
        }
    }


    @ApiOperation({ summary: 'Get all extra price' })
    @ApiResponse({ status: 200, description: 'Extra price list' })
    @Get()
    async getAll() {
        return await this.extraPriceService.getAll();
    }

    @ApiOperation({ summary: 'Get extra price by category id' })
    @ApiResponse({ status: 200, description: 'Extra price' })
    @ApiResponse({ status: 400, description: 'Extra price not found' })
    @Get("/:id")
    async getById(@Param("id") idCategory: string) {
        console.log(idCategory);
        return await this.extraPriceService.getByCategoryId(idCategory);
    }

    @ApiOperation({ summary: 'Delete extra price by category id' })
    @ApiResponse({ status: 200, description: 'Extra price deleted' })
    @ApiResponse({ status: 400, description: 'Extra price not found' })
    @Delete('/:id')
    async deleteById(@Param('id') idCategory: string) {
        console.log(idCategory, "idCategory");
        if (!idCategory) {
            throw new Error('idCategory is required');
        }
        return await this.extraPriceService.deleteByCategoryId(idCategory);
    }

}
