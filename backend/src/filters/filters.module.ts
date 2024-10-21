import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ProductsSizesModule } from 'src/products-sizes/products-sizes.module';
import { FiltersController } from './filters.controller';
import { Filter } from './filters.model';
import { FiltersService } from './filters.service';

@Module({
  controllers: [FiltersController],
  providers: [FiltersService],
  imports: [
    SequelizeModule.forFeature([Filter]),
    ProductsSizesModule
  ],
  exports: [
    FiltersService
  ]
})
export class FiltersModule {}
