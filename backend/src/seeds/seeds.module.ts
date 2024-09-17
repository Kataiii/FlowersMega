import { Module } from '@nestjs/common';
import { FiltersModule } from 'src/filters/filters.module';
import { ItemsFilterModule } from 'src/items-filter/items-filter.module';
import { SeedsController } from './seeds.controller';
import { SeedsService } from './seeds.service';

@Module({
  controllers: [SeedsController],
  providers: [SeedsService],
  imports: [
    FiltersModule,
    ItemsFilterModule
  ]
})
export class SeedsModule {}
