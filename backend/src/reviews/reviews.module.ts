import { forwardRef, Module } from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { ReviewsController } from './reviews.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Review } from './reviews.model';
import { ImagesReviewsModule } from 'src/images-reviews/images-reviews.module';
import { ProductsSizesModule } from 'src/products-sizes/products-sizes.module';
import { ProductsModule } from 'src/products/products.module';

@Module({
  providers: [ReviewsService],
  controllers: [ReviewsController],
  imports: [
    SequelizeModule.forFeature([Review]),
    ImagesReviewsModule,
    forwardRef(() => ProductsSizesModule),
    ProductsModule
  ],
  exports: [
    ReviewsService
  ]
})
export class ReviewsModule { }
