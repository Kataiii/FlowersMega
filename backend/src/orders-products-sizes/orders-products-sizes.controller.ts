import { Controller, Get, Param } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { OrderProductSize } from './orders-products-sizes.model';
import { OrdersProductsSizesService } from './orders-products-sizes.service';

@ApiTags("Orders Products Sizes")
@Controller('orders-products-sizes')
export class OrdersProductsSizesController {
    constructor(private ordersProductsSizesService : OrdersProductsSizesService){}

    @ApiOperation({summary: 'Get orders products sizes by order id'})
    @ApiResponse({status: 200, type: [OrderProductSize]})
    @ApiResponse({status: 404, description: "Orders products sizes not fount"})
    @Get("/order/:id")
    async getById(@Param("id") id: number){
        return await this.ordersProductsSizesService.getByOrderId(id);
    }
}
