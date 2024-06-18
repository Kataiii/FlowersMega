import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { ProductSize } from 'src/products-sizes/products-sizes.model';
import { CreateOrderProductSizeDto } from './dto/createOrdersProductsSizes.dto';
import { OrderProductSize } from './orders-products-sizes.model';

@Injectable()
export class OrdersProductsSizesService {
    constructor(@InjectModel(OrderProductSize) private ordersProductsSizesRepository: typeof OrderProductSize){}

    async create(dto: CreateOrderProductSizeDto){
        return await this.ordersProductsSizesRepository.create(dto);
    }

    async getAll(){
        const ordersProductsSizes = await this.ordersProductsSizesRepository.findAll()
        if(ordersProductsSizes.length === 0) throw new HttpException("Orders products sizes not fount", HttpStatus.NOT_FOUND);
        return ordersProductsSizes;
    }

    async getById(id: number | string){
        const orderProductSize = await this.ordersProductsSizesRepository.findOne({ where: {id: id}});
        if(orderProductSize === null) throw new HttpException("Order productSize not found", HttpStatus.NOT_FOUND);
        return orderProductSize;
    }

    async getByOrderId(idOrder: number | string){
        const ordersProductsSizes = await this.ordersProductsSizesRepository.findAll(
            {
                where: {idOrder: idOrder}, 
                include: [{
                    model: ProductSize
                }]
            }
        );
        if(ordersProductsSizes.length === 0) throw new HttpException("Orders products sizes not fount", HttpStatus.NOT_FOUND);
        return ordersProductsSizes;
    }
}
