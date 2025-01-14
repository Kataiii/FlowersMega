import { Body, Controller, Get, Param, Post, Query, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateOrderDto } from './dto/createOder.dto';
import { Order } from './order.model';
import { OrderService } from './order.service';
import { Request } from 'express';
import { ExtractToken } from 'src/utils/ExtractToken';
import { Roles } from 'src/auth/guards/decorators/roles-auth.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesAuthGuard } from 'src/auth/guards/roles-auth.guard';

@ApiTags("Orders")
@Controller('orders')
export class OrderController {
    constructor(private ordersService: OrderService) { }

    @ApiOperation({ summary: 'Create order' })
    @ApiResponse({ status: 201, type: Order })
    @Post()
    async create(@Body() dto: CreateOrderDto, @Req() request: Request) {
        try {
            const response = await ExtractToken.checkAccessToken(ExtractToken.extractTokenFromHeader(request));
            dto.idUser = response.id;
        }
        catch {
            dto.idUser = undefined;
        }
        console.log(dto, "AHAHAHHAHAHAHHAHAHAHAHAHAAHAHAHAHAHAHAH")
        const arrayDate = String(dto.dateDelivery).split('.');
        // dto.dateDelivery = new Date(Number(arrayDate[2]), Number(arrayDate[1]), Number(arrayDate[0]));
        const arrayDateOrder = String(dto.dateDelivery.toLocaleString()).split(',').join('.').split(':').join('.').split('.');
        // dto.dateOrder = new Date(Number(arrayDateOrder[2]), Number(arrayDateOrder[1]), Number(arrayDateOrder[0]), Number(arrayDateOrder[3]), Number(arrayDateOrder[4]), Number(arrayDateOrder[5]));
        return await this.ordersService.create(dto);
    }

    @ApiBearerAuth('access-token')
    @Roles("admin")
    @UseGuards(JwtAuthGuard, RolesAuthGuard)
    @ApiOperation({ summary: 'Get all orders' })
    @ApiResponse({ status: 200, type: [Order] })
    @ApiResponse({ status: 404, description: "Orders not fount" })
    @Get()
    async getAll() {
        return await this.ordersService.getAll();
    }

    @ApiBearerAuth('access-token')
    @Roles("admin", "user")
    @UseGuards(JwtAuthGuard, RolesAuthGuard)
    @ApiOperation({ summary: 'Get orders by user id' })
    @ApiResponse({ status: 200, type: [Order] })
    @ApiResponse({ status: 404, description: "Orders not found" })
    @Get("/user")
    async getByUserId(@Req() request: Request) {
        const response = await ExtractToken.checkAccessToken(ExtractToken.extractTokenFromHeader(request));
        return await this.ordersService.getByUserId(response.id);
    }

    @ApiBearerAuth('access-token')
    @Roles("admin")
    @UseGuards(JwtAuthGuard, RolesAuthGuard)
    @ApiOperation({ summary: 'Get orers with pagination' })
    @ApiResponse({ status: 200, type: [Order] })
    @ApiResponse({ status: 404, description: "Orders not found" })
    @Get("/orders-with-pagination/:page/:limit")
    async getOrdersWithPagination(@Param("page") page: number, @Param("limit") limit: number, @Query("search") search?: string, @Query("field") field?: string, @Query("type") type?: string) {
        return await this.ordersService.getOrdersWithPagination(page, limit, search, field, type);
    }

    @ApiBearerAuth('access-token')
    @Roles("admin", "user")
    @UseGuards(JwtAuthGuard, RolesAuthGuard)
    @ApiOperation({ summary: 'Get order by id' })
    @ApiResponse({ status: 200, type: Order })
    @ApiResponse({ status: 404, description: "Order not fount" })
    @Get("/:id")
    async getById(@Param("id") id: number) {
        return await this.ordersService.getById(id);
    }
}
