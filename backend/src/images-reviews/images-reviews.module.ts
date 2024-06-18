import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { FilesModule } from 'src/files/files.module';
import { ImageReview } from './images-reviews.model';
import { ImagesReviewsService } from './images-reviews.service';

@Module({
  providers: [ImagesReviewsService],
  imports: [
    SequelizeModule.forFeature([ImageReview]),
    FilesModule
  ],
  exports: [
    ImagesReviewsService
  ]
})
export class ImagesReviewsModule {}
