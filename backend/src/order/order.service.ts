import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { OrdersProductsSizesService } from 'src/orders-products-sizes/orders-products-sizes.service';
import { ProductsSizesFullService } from 'src/products-sizes/products-sizes-full.service';
import { TgBotService } from 'src/tg-bot/tg-bot.service';
import { CreateOrderDto } from './dto/createOder.dto';
import { Order } from './order.model';
import { Op } from 'sequelize';
import { count } from 'console';

@Injectable()
export class OrderService {
    constructor(
        @InjectModel(Order) private ordersRepository: typeof Order,
        private ordersProductsSizesService: OrdersProductsSizesService,
        private tgBotService: TgBotService,
        private productsSizesFullService: ProductsSizesFullService
    ) { }

    async create(dto: CreateOrderDto) {
        console.log(dto);
        const dateOrder = new Date(dto.dateOrder);
        const dateDelivery = new Date(dto.dateDelivery);
        const order = await this.ordersRepository.create({
            name: dto.name,
            dateOrder: dateOrder,
            dateDelivery: dateDelivery,
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
            comment: dto.comment,
            postcards: dto.postcards
        });
        console.log("order ", order.id);
        console.log("dateOrder ", dateOrder);
        console.log("dateDelivery ", dateDelivery);
        dto.itemsOrder && dto.itemsOrder.forEach(async (item) => {
            await this.ordersProductsSizesService.create({
                idOrder: order.id,
                idProductSize: item.product.id,
                count: item.count
            })
        });

        const productsSizes = await Promise.all(dto.itemsOrder.map(async (item) => {
            return await this.productsSizesFullService.getFullById(item.product.id);
        }));
        let textPostcards = dto.postcards.map(item => {
            const productSizeId = item.updatedId.split('-');
            return {
                id: item.id,
                text: item.text,
                productSizeId: productSizeId[productSizeId.length - 1]
            }
        })
        this.tgBotService.sendMessage(
            `
Flower's Mega ${dto.addressDelivery.split(',')[0]}
Новый заказ: #${order.id}

ЗАКАЗЧИК
Имя заказчика: ${dto.nameCustomer}
Телефон заказчика: ${dto.phoneCustomer}
E-mail заказчика: ${dto.emailCustomer}

ПОЛУЧАТЕЛЬ 
Имя получателя: ${dto.nameRecipient} 
Телефон получателя: ${dto.phoneRecipient} 
Адрес доставки: ${dto.addressDelivery}
Дата доставки: ${dateDelivery.toLocaleDateString()} ${dto.startTimeDelivery} - ${dto.endTimeDelivery}

ДЕТАЛИ ЗАКАЗА
${productsSizes.map((item, index) => {
                return `"${item.product.name}" (${item.size.name}) × 
    ${dto.itemsOrder[index].count} : ${item.productSize.prise * dto.itemsOrder[index].count} руб.\n
    ${textPostcards.forEach(postcard => {
                    if (Number(postcard.productSizeId) === item.productSize.id) {
                        `Добавить подпись к открытке: \n
                        ${postcard.text}
                    `
                        textPostcards = textPostcards.filter(item => item.id !== postcard.id)
                    }
                })}
    
    `  }).toString().split(",").join("\n")
            }

${dto.comment !== undefined
                ? `Примечания к заказу: ${dto.comment}`
                : ""}

ИТОГО: ${order.cost} руб.
            `
        );

        return await this.ordersRepository.findOne(
            {
                where: { id: order.id },
                include: [{ all: true }]
            }
        )
    }

    async getAll() {
        const orders = await this.ordersRepository.findAll({
            include: [{ all: true }]
        })
        if (orders.length === 0) throw new HttpException("Orders not fount", HttpStatus.NOT_FOUND);
        return orders;
    }

    async getById(id: number | string) {
        const order = await this.ordersRepository.findOne(
            {
                where: { id: id },
                include: [{ all: true }]
            }
        );
        if (order === null) throw new HttpException("Order not found", HttpStatus.NOT_FOUND);
        return order;
    }

    async getByUserId(idUser: number | string) {
        const orders = await this.ordersRepository.findAll({
            where: { idUser: idUser },
            include: [{ all: true }]
        })
        if (orders.length === 0) throw new HttpException("Orders not fount", HttpStatus.NOT_FOUND);
        return orders;
    }

    async getOrdersWithPagination(page: number, limit: number, search?: string, field?: string, type?: string) {
        if (search) {
            const paginationResult = (await this.ordersRepository.findAndCountAll({ where: { id: search } })).count;
            const orders = (await this.ordersRepository.findAll({
                where: {
                    id: search,
                },
                limit: limit,
                offset: (page - 1) * limit,
                include: [{ all: true }],
                order: field && type ? [[field, type]] : [["id", "ASC"]]
            }));
            console.log(orders);
            return {
                count: paginationResult,
                orders: orders
            };

        }
        const ordersCount = (await this.ordersRepository.findAndCountAll()).count;

        const orders = await this.ordersRepository.findAll({
            limit: limit,
            offset: (page - 1) * limit,
            include: [{ all: true }],
            order: field && type ? [[field, type]] : [["id", "ASC"]]
        })

        if (orders.length === 0) throw new HttpException("Orders not found", HttpStatus.NOT_FOUND);
        console.log(orders);
        return {
            count: ordersCount,
            orders: orders
        }

    }
}
