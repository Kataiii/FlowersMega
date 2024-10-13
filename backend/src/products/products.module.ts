import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Product } from './products.model';
import { ImagesModule } from 'src/images/images.module';
import { ProductSize } from 'src/products-sizes/products-sizes.model';

@Module({
  providers: [ProductsService],
  controllers: [ProductsController],
  imports: [
    SequelizeModule.forFeature([Product, ProductSize]),
    ImagesModule,
  ],
  exports: [
    ProductsService
  ]
})
export class ProductsModule { }
