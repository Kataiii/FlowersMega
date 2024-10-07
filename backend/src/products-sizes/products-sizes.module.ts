import { forwardRef, Module } from '@nestjs/common';
import { ProductsSizesService } from './products-sizes.service';
import { ProductsSizesController } from './products-sizes.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { ProductSize } from './products-sizes.model';
import { ProductsModule } from 'src/products/products.module';
import { SizesModule } from 'src/sizes/sizes.module';
import { ProductsSizesFullService } from './products-sizes-full.service';
import { ReviewsModule } from 'src/reviews/reviews.module';
import { CategoriesProductsModule } from 'src/categories-products/categories-products.module';
import { ProductsItemsFilterModule } from 'src/products-items-filter/products-items-filter.module';

@Module({
  providers: [ProductsSizesService, ProductsSizesFullService],
  controllers: [ProductsSizesController],
  imports: [
    SequelizeModule.forFeature([ProductSize]),
    ProductsModule,
    SizesModule,
    forwardRef(() => ReviewsModule),
    CategoriesProductsModule,
    ProductsItemsFilterModule
  ],
  exports: [
    ProductsSizesService,
    ProductsSizesFullService,

  ]
})
export class ProductsSizesModule { }
