import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiBody, ApiConsumes, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { MinOrderCostService } from './min-order-cost.service';
import { MinOrderCost } from './min-order-cost.model';

@ApiTags("MinOrderCost")
@Controller('min-order-cost')
export class MinOrderCostController {
    constructor(private minOrderCostService: MinOrderCostService) { }

    @ApiOperation({ summary: 'Create mininal order cost' })
    @ApiResponse({ status: 201, type: MinOrderCost })
    @ApiConsumes('multipart/form-data')
    @ApiBody({ type: MinOrderCost })
    @Post()
    async create(@Body() dto: MinOrderCost) {
        return await this.minOrderCostService.create(dto);
    }

    @ApiOperation({ summary: 'Get mininal order cost' })
    @ApiResponse({ status: 200, type: MinOrderCost })
    @ApiResponse({ status: 404, description: 'Mininal order cost not found' })
    @Get()
    async getAll() {
        return await this.minOrderCostService.get();
    }
}
