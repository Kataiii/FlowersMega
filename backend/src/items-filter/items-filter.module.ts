import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ItemsFilterController } from './items-filter.controller';
import { ItemFilter } from './items-filter.model';
import { ItemsFilterService } from './items-filter.service';

@Module({
  controllers: [ItemsFilterController],
  providers: [ItemsFilterService],
  imports: [
    SequelizeModule.forFeature([ItemFilter])
  ]
})
export class ItemsFilterModule {}
