import { Module } from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { ReviewsController } from './reviews.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Review } from './reviews.model';
import { ImagesReviewsModule } from 'src/images-reviews/images-reviews.module';

@Module({
  providers: [ReviewsService],
  controllers: [ReviewsController],
  imports: [
    SequelizeModule.forFeature([Review]),
    ImagesReviewsModule
  ]
})
export class ReviewsModule {}
