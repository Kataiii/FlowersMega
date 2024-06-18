import { Module } from '@nestjs/common';
import { ProductsSizesService } from './products-sizes.service';
import { ProductsSizesController } from './products-sizes.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { ProductSize } from './products-sizes.model';
import { ProductsModule } from 'src/products/products.module';
import { SizesModule } from 'src/sizes/sizes.module';

@Module({
  providers: [ProductsSizesService],
  controllers: [ProductsSizesController],
  imports: [
    SequelizeModule.forFeature([ProductSize]),
    ProductsModule,
    SizesModule
  ]
})
export class ProductsSizesModule {}
