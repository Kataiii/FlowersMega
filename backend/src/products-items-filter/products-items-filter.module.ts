import { Module } from '@nestjs/common';
import { ProductsItemsFilterService } from './products-items-filter.service';
import { ProductsItemsFilterController } from './products-items-filter.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { ProductsItemsFilter } from './products-items-filter.model';
import { ItemsFilterService } from 'src/items-filter/items-filter.service';
import { ItemFilter } from 'src/items-filter/items-filter.model';
import { ItemsFilterModule } from 'src/items-filter/items-filter.module';
import { TypesProductModule } from 'src/types-product/types-product.module';

@Module({
  providers: [ProductsItemsFilterService],
  controllers: [ProductsItemsFilterController],
  imports: [
    SequelizeModule.forFeature([ProductsItemsFilter]),
    ItemsFilterModule,
    TypesProductModule
  ],
  exports: [
    ProductsItemsFilterService,
  ],
})
export class ProductsItemsFilterModule { }


