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
import { ExtraPriceService } from 'src/extra-price/extra-price.service';
import { ExtraPriceModule } from 'src/extra-price/extra-price.module';
import { TypesProductModule } from 'src/types-product/types-product.module';
import { CategoriesProductssizesModule } from 'src/categories-productssizes/categories-productssizes.module';
import { CategoriesModule } from 'src/categories/categories.module';
import { ItemsFilterModule } from 'src/items-filter/items-filter.module';

@Module({
  providers: [ProductsSizesService, ProductsSizesFullService],
  controllers: [ProductsSizesController],
  imports: [
    SequelizeModule.forFeature([ProductSize]),
    ProductsModule,
    forwardRef(() => ExtraPriceModule),
    SizesModule,
    forwardRef(() => ReviewsModule),
    CategoriesProductsModule,
    ProductsItemsFilterModule,
    TypesProductModule,
    CategoriesProductssizesModule,
    CategoriesModule,
    ItemsFilterModule,
  ],
  exports: [
    ProductsSizesService,
    ProductsSizesFullService,
  ]
})
export class ProductsSizesModule { }
