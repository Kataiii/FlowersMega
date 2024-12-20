import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Order } from './order.model';
import { OrdersProductsSizesModule } from 'src/orders-products-sizes/orders-products-sizes.module';
import { TgBotModule } from 'src/tg-bot/tg-bot.module';
import { ProductsSizesModule } from 'src/products-sizes/products-sizes.module';

@Module({
  providers: [OrderService],
  controllers: [OrderController],
  imports: [
    SequelizeModule.forFeature([Order]),
    OrdersProductsSizesModule,
    TgBotModule,
    ProductsSizesModule
  ]
})
export class OrderModule {}
