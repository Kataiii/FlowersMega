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
        const parseDateTime = (dateTimeString: string): Date => {
            const [datePart, timePart] = dateTimeString.split(', ');
            const [day, month, year] = datePart.split('.').map(Number);
            if (timePart) {
                const [hours, minutes] = timePart.split(':').map(Number);
                return new Date(year, month - 1, day, hours, minutes, 0);
            }
            return new Date(year, month - 1, day);
        };

        const dateOrder = parseDateTime(dto.dateOrder);
        const dateDelivery = parseDateTime(dto.dateDelivery);

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

        dto.itemsOrder && dto.itemsOrder.forEach(async (item) => {
            await this.ordersProductsSizesService.create({
                idOrder: order.id,
                idProductSize: item.product.id,
                count: item.count
            });
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
            };
        });
        const formatDate = (date: Date): string => {
            const day = date.getDate().toString().padStart(2, '0');
            const month = (date.getMonth() + 1).toString().padStart(2, '0');
            const year = date.getFullYear();
            return `${day}.${month}.${year}`;
        };
        this.tgBotService.sendMessage(`Lucky Flora ${dto.addressDelivery.split(',')[0]}
Новый заказ: #${order.id}
    
ЗАКАЗЧИК
Имя заказчика: ${dto.nameCustomer}
Телефон заказчика: ${dto.phoneCustomer}
E-mail заказчика: ${dto.emailCustomer}
    
ПОЛУЧАТЕЛЬ
Имя получателя: ${dto.nameRecipient}
Телефон получателя: ${dto.phoneRecipient}
Адрес доставки: ${dto.addressDelivery}
Дата доставки: ${formatDate(dateDelivery)} ${dto.startTimeDelivery} - ${dto.endTimeDelivery}
    
ДЕТАЛИ ЗАКАЗА
${productsSizes.map((item, index) => {
            let result = `"${item.product.name}" (${item.size.name}) × ${dto.itemsOrder[index].count} : ${item.productSize.extraPrice * dto.itemsOrder[index].count} руб.`;

            if (textPostcards.length > 0) {
                textPostcards.forEach(postcard => {
                    if (Number(postcard.productSizeId) === item.productSize.id) {
                        result += `\nДобавить подпись к открытке:\n${postcard.text}`;
                        textPostcards = textPostcards.filter(item => item.id !== postcard.id);
                    }
                });
            }
            return result;
        }).join('\n')}

${dto.comment ? `Примечания к заказу: ${dto.comment}\n` : ''}
ИТОГО: ${order.cost} руб.`);

        return await this.ordersRepository.findOne({
            where: { id: order.id },
            include: [{ all: true }]
        });
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
        return {
            count: ordersCount,
            orders: orders
        }

    }
}
