import { BadRequestException, Body, Controller, Delete, Get, Param, Post, Req, UseGuards } from '@nestjs/common';
import { ExtraPriceService } from './extra-price.service';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ExtraPrice } from './extra-price.model';
import { Roles } from 'src/auth/guards/decorators/roles-auth.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesAuthGuard } from 'src/auth/guards/roles-auth.guard';
import { Request } from 'express';

@ApiTags('ExtraPrice')
@Controller('extra-price')
export class ExtraPriceController {
    constructor(private extraPriceService: ExtraPriceService) { }

    @ApiBearerAuth('access-token')
    @Roles("admin")
    @UseGuards(JwtAuthGuard, RolesAuthGuard)
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

    @ApiBearerAuth('access-token')
    @Roles("admin")
    @UseGuards(JwtAuthGuard, RolesAuthGuard)
    @ApiOperation({ summary: 'Get all extra price' })
    @ApiResponse({ status: 200, description: 'Extra price list' })
    @Get()
    async getAll(@Req() request: Request) {
        // console.log(request);
        return await this.extraPriceService.getAll();
    }

    @ApiBearerAuth('access-token')
    @Roles("admin")
    @UseGuards(JwtAuthGuard, RolesAuthGuard)
    @ApiOperation({ summary: 'Get extra price by category id' })
    @ApiResponse({ status: 200, description: 'Extra price' })
    @ApiResponse({ status: 400, description: 'Extra price not found' })
    @Get("/:id")
    async getById(@Param("id") idCategory: string) {
        // console.log(idCategory);
        return await this.extraPriceService.getByCategoryId(idCategory);
    }

    @ApiBearerAuth('access-token')
    @Roles("admin")
    @UseGuards(JwtAuthGuard, RolesAuthGuard)
    @ApiOperation({ summary: 'Delete extra price by category id' })
    @ApiResponse({ status: 200, description: 'Extra price deleted' })
    @ApiResponse({ status: 400, description: 'Extra price not found' })
    @Delete('/:id')
    async deleteById(@Param('id') idCategory: string) {
        // console.log(idCategory, "idCategory");
        if (!idCategory) {
            throw new Error('idCategory is required');
        }
        return await this.extraPriceService.deleteByCategoryId(idCategory);
    }
}
