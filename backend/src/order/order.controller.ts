import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateOrderDto } from './dto/createOder.dto';
import { Order } from './order.model';
import { OrderService } from './order.service';

@ApiTags("Orders")
@Controller('order')
export class OrderController {
    constructor(private ordersService : OrderService){}

    @ApiOperation({summary: 'Create order'})
    @ApiResponse({status: 201, type: Order})
    @Post()
    async create(@Body()dto: CreateOrderDto){
        return await this.ordersService.create(dto);
    }

    @ApiOperation({summary: 'Get all orders'})
    @ApiResponse({status: 200, type: [Order]})
    @ApiResponse({status: 404, description: "Orders not fount"})
    @Get()
    async getAll(){
        return await this.ordersService.getAll();
    }

    @ApiOperation({summary: 'Get order by id'})
    @ApiResponse({status: 200, type: Order})
    @ApiResponse({status: 404, description: "Order not fount"})
    @Get("/:id")
    async getById(@Param("id") id: number){
        return await this.ordersService.getById(id);
    }

    @ApiOperation({summary: 'Get orders by user id'})
    @ApiResponse({status: 200, type: [Order]})
    @ApiResponse({status: 404, description: "Orders not found"})
    @Get("/user/:id")
    async getByUserId(@Param("id") id: number){
        return await this.ordersService.getByUserId(id);
    }
}
