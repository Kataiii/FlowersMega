import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateReviewDto } from './dto/createReviews.dto';
import { Review } from './reviews.model';
import { ReviewsService } from './reviews.service';

@ApiTags("Reviews")
@Controller('reviews')
export class ReviewsController {
    constructor(private reviewsService : ReviewsService){}

    @ApiOperation({summary: 'Create review'})
    @ApiResponse({status: 201, type: Review})
    @Post()
    async create(@Body()dto: CreateReviewDto){
        return await this.reviewsService.create(dto);
    }

    @ApiOperation({summary: 'Get all reviews'})
    @ApiResponse({status: 200, type: [Review]})
    @ApiResponse({status: 404, description: "Reviews not fount"})
    @Get()
    async getAll(){
        return await this.reviewsService.getAll();
    }

    @ApiOperation({summary: 'Get review by id'})
    @ApiResponse({status: 200, type: Review})
    @ApiResponse({status: 404, description: "Review not fount"})
    @Get("/:id")
    async getById(@Param("id") id: number){
        return await this.reviewsService.getById(id);
    }

    @ApiOperation({summary: 'Get reviews by product size id'})
    @ApiResponse({status: 200, type: [Review]})
    @ApiResponse({status: 404, description: "Reviews not found"})
    @Get("/product/:id")
    async getByProductSizeId(@Param("id") id: number){
        return await this.reviewsService.getByProductSizeId(id);
    }
}
