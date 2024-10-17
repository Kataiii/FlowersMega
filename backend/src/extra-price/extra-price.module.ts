import { Module } from '@nestjs/common';
import { ExtraPriceController } from './extra-price.controller';
import { ExtraPriceService } from './extra-price.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { ExtraPrice } from './extra-price.model';
import { CategoriesProducts } from 'src/categories-products/categories_products.model';

@Module({
  controllers: [ExtraPriceController],
  providers: [ExtraPriceService],
  imports: [
    SequelizeModule.forFeature([ExtraPrice, CategoriesProducts]),
  ],
  exports: [ExtraPriceService],
})
export class ExtraPriceModule { }
