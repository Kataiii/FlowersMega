import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { FiltersController } from './filters.controller';
import { Filter } from './filters.model';
import { FiltersService } from './filters.service';

@Module({
  controllers: [FiltersController],
  providers: [FiltersService],
  imports: [
    SequelizeModule.forFeature([Filter])
  ]
})
export class FiltersModule {}
