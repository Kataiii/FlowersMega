import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { FilesModule } from 'src/files/files.module';
import { Image } from './images.model';
import { ImagesService } from './images.service';

@Module({
  providers: [ImagesService],
  imports: [
    SequelizeModule.forFeature([Image]),
    FilesModule
  ],
  exports: [
    ImagesService
  ]
})
export class ImagesModule {}
