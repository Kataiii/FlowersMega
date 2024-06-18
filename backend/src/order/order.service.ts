import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { OrdersProductsSizesService } from 'src/orders-products-sizes/orders-products-sizes.service';
import { CreateOrderDto } from './dto/createOder.dto';
import { Order } from './order.model';

@Injectable()
export class OrderService {
    constructor(
        @InjectModel(Order) private ordersRepository: typeof Order,
        private ordersProductsSizesService: OrdersProductsSizesService
    ){}

    async create(dto: CreateOrderDto){
        const order = await this.ordersRepository.create({
            name: dto.name,
            dateOrder: dto.dateOrder,
            dateDelivery: dto.dateDelivery,
            cost: dto.cost,
            idUser: dto.idUser,
            nameCustomer: dto.nameCustomer,
            emailCustomer: dto.emailCustomer,
            phoneCustomer: dto.phoneCustomer,
            nameRecipient: dto.nameRecipient,
            phoneRecipient: dto.phoneRecipient,
            canCall: dto.canCall,
            idCity: dto.idCity,
            addressDelivery: dto.addressDelivery,
            startTimeDelivery: dto.startTimeDelivery,
            endTimeDelivery: dto.endTimeDelivery,
            comment: dto.comment
        });

        dto.itemsOrder && dto.itemsOrder.forEach(async(item) => {
            await this.ordersProductsSizesService.create({
                idOrder: order.id,
                idProductSize: item.product.id,
                count: item.count
            })
        });

        return await this.ordersRepository.findOne(
            {
                where: {id: order.id},
                include: [{ all: true }]
            }
        )
    }

    async getAll(){
        const orders = await this.ordersRepository.findAll({
            include: [{ all: true }]
        })
        if(orders.length === 0) throw new HttpException("Orders not fount", HttpStatus.NOT_FOUND);
        return orders;
    }

    async getById(id: number | string){
        const order = await this.ordersRepository.findOne(
            {
                where: {id: id}, 
                include: [{ all: true }]
            }
        );
        if(order === null) throw new HttpException("Order not found", HttpStatus.NOT_FOUND);
        return order;
    }

    async getByUserId(idUser: number | string){
        const orders = await this.ordersRepository.findAll({
            where: { idUser: idUser },
            include: [{ all: true }]
        })
        if(orders.length === 0) throw new HttpException("Orders not fount", HttpStatus.NOT_FOUND);
        return orders;
    }
}
