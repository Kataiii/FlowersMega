import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { CategoriesProductsSizes } from './categories-productssizes.model';
import { CategoriesProductssizesService } from './categories-productssizes.service';

@Module({
  providers: [CategoriesProductssizesService],
  imports: [
    SequelizeModule.forFeature([CategoriesProductsSizes]),
  ],
  exports: [
    CategoriesProductssizesService
  ]
})
export class CategoriesProductssizesModule {}
