import { Module } from '@nestjs/common';
import { CategoriesProductsService } from './categories-products.service';
import { CategoriesProductsController } from './categories-products.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { CategoriesProducts } from './categories_products.model';
import { Category } from 'src/categories/categories.model';

@Module({
  providers: [CategoriesProductsService],
  controllers: [CategoriesProductsController],
  imports: [
    SequelizeModule.forFeature([CategoriesProducts, Category]),
  ],
  exports: [
    CategoriesProductsService
  ]
})
export class CategoriesProductsModule { }
