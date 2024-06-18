import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { OrderProductSize } from './orders-products-sizes.model';
import { OrdersProductsSizesService } from './orders-products-sizes.service';
import { OrdersProductsSizesController } from './orders-products-sizes.controller';

@Module({
  providers: [OrdersProductsSizesService],
  imports: [
    SequelizeModule.forFeature([OrderProductSize]),
  ],
  exports: [
    OrdersProductsSizesService
  ],
  controllers: [OrdersProductsSizesController]
})
export class OrdersProductsSizesModule {}
