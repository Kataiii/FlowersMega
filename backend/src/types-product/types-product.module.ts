import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { TypesProductController } from './types-product.controller';
import { TypeProduct } from './types-product.model';
import { TypesProductService } from './types-product.service';

@Module({
  controllers: [TypesProductController],
  providers: [TypesProductService],
  imports: [
    SequelizeModule.forFeature([TypeProduct])
  ],
  exports: [TypesProductService]
})
export class TypesProductModule { }
