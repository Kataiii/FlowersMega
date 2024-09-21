import { Module } from '@nestjs/common';
import { ProductsItemsFilterService } from './products-items-filter.service';
import { ProductsItemsFilterController } from './products-items-filter.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { ProductsItemsFilter } from './products-items-filter.model';

@Module({
  providers: [ProductsItemsFilterService],
  controllers: [ProductsItemsFilterController],
  imports: [
    SequelizeModule.forFeature([ProductsItemsFilter]),
  ],
  exports: [
    ProductsItemsFilterService
  ]
})
export class ProductsItemsFilterModule {}
