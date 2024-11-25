import { forwardRef, Module } from '@nestjs/common';
import { ExtraPriceController } from './extra-price.controller';
import { ExtraPriceService } from './extra-price.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { ExtraPrice } from './extra-price.model';
import { CategoriesProducts } from 'src/categories-products/categories_products.model';
import { ProductsSizesService } from 'src/products-sizes/products-sizes.service';
import { ProductsSizesModule } from 'src/products-sizes/products-sizes.module';

@Module({
  imports: [
    SequelizeModule.forFeature([ExtraPrice, CategoriesProducts]),
    forwardRef(() => ProductsSizesModule),
  ],
  controllers: [ExtraPriceController],
  providers: [ExtraPriceService],
  exports: [ExtraPriceService],
})
export class ExtraPriceModule { }
