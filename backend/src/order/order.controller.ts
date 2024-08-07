import { Body, Controller, Get, Param, Post, Req } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateOrderDto } from './dto/createOder.dto';
import { Order } from './order.model';
import { OrderService } from './order.service';
import { Request } from 'express';
import { ExtractToken } from 'src/utils/ExtractToken';

@ApiTags("Orders")
@Controller('orders')
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

    @ApiOperation({summary: 'Get orders by user id'})
    @ApiResponse({status: 200, type: [Order]})
    @ApiResponse({status: 404, description: "Orders not found"})
    @Get("/user")
    async getByUserId(@Req() request: Request){
        const response = await ExtractToken.checkAccessToken(ExtractToken.extractTokenFromHeader(request));
        return await this.ordersService.getByUserId(response.id);
    }

    @ApiOperation({summary: 'Get order by id'})
    @ApiResponse({status: 200, type: Order})
    @ApiResponse({status: 404, description: "Order not fount"})
    @Get("/:id")
    async getById(@Param("id") id: number){
        return await this.ordersService.getById(id);
    }
}
