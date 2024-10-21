import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/auth/guards/decorators/roles-auth.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesAuthGuard } from 'src/auth/guards/roles-auth.guard';
import { OrderProductSize } from './orders-products-sizes.model';
import { OrdersProductsSizesService } from './orders-products-sizes.service';

@ApiTags("Orders Products Sizes")
@Controller('orders-products-sizes')
export class OrdersProductsSizesController {
    constructor(private ordersProductsSizesService : OrdersProductsSizesService){}

    @ApiBearerAuth('access-token')
    @Roles("admin", "user")
    @UseGuards(JwtAuthGuard, RolesAuthGuard)
    @ApiOperation({summary: 'Get orders products sizes by order id'})
    @ApiResponse({status: 200, type: [OrderProductSize]})
    @ApiResponse({status: 404, description: "Orders products sizes not fount"})
    @Get("/order/:id")
    async getById(@Param("id") id: number){
        return await this.ordersProductsSizesService.getByOrderId(id);
    }
}
