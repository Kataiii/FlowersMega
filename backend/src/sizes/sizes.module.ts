import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { SizesController } from './sizes.controller';
import { Size } from './sizes.model';
import { SizesService } from './sizes.service';

@Module({
  controllers: [SizesController],
  providers: [SizesService],
  imports: [
    SequelizeModule.forFeature([Size])
  ]
})
export class SizesModule {}
