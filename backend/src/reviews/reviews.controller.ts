import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UploadedFiles, UseGuards, UseInterceptors } from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/auth/guards/decorators/roles-auth.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesAuthGuard } from 'src/auth/guards/roles-auth.guard';
import { GetPaginationFullReviewDto } from './dto/createPagination.dto';
import { CreateReviewDto } from './dto/createReviews.dto';
import { DeleteReviewDto } from './dto/deleteReview.dto';
import { FullReviewDto } from './dto/fullReview.dto';
import { ReviewsProductSizeDto } from './dto/reviewsProductsSize.dto';
import { StaticticReviews } from './dto/statisticByProductSizeId.dto';
import { UpdateReviewDto } from './dto/updateReview.dto';
import { Review } from './reviews.model';
import { ReviewsService } from './reviews.service';

@ApiTags("Reviews")
@Controller('reviews')
export class ReviewsController {
  constructor(private reviewsService: ReviewsService) { }


  @ApiOperation({ summary: 'Create review' })
  @ApiResponse({ status: 201, type: Review })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        rating: { type: 'number' },
        comment: { type: 'string' },
        idUser: { type: 'number' },
        idProductSize: { type: 'number' },
        firstname: { type: 'string' },
        phone: { type: 'string' },
        files: {
          type: 'array',
          items: {
            type: 'string',
            format: 'binary',
          }
        },
      },
    },
  })
  @UseInterceptors(FilesInterceptor('files'))
  @Post()
  async create(@Body() dto: CreateReviewDto, @UploadedFiles() files) {
    return await this.reviewsService.create(dto, files);
  }

  @ApiOperation({ summary: 'Get all reviews' })
  @ApiResponse({ status: 200, type: [Review] })
  @ApiResponse({ status: 404, description: "Reviews not fount" })
  @Get()
  async getAll() {
    return await this.reviewsService.getAll();
  }

  @ApiOperation({ summary: 'Get reviews statistic by product size id' })
  @ApiResponse({ status: 200, type: ReviewsProductSizeDto })
  @Get("/reviews-product-size/:id/:limit/:page")
  async getReviewsProductSize(
    @Param("id") id: number,
    @Param("limit") limit: number,
    @Param("page") page: number) {
    return await this.reviewsService.getRewiewsWithStatisticByProductId(id, limit, page);
  }

  @ApiOperation({ summary: 'Get review by id' })
  @ApiResponse({ status: 200, type: Review })
  @ApiResponse({ status: 404, description: "Review not fount" })
  @Get("/:id")
  async getById(@Param("id") id: number) {
    return await this.reviewsService.getById(id);
  }

  @ApiOperation({ summary: 'Get reviews by product size id' })
  @ApiResponse({ status: 200, type: [Review] })
  @ApiResponse({ status: 404, description: "Reviews not found" })
  @Get("/product/:id")
  async getByProductSizeId(@Param("id") id: number) {
    return await this.reviewsService.getByProductSizeId(id);
  }

  @ApiOperation({ summary: 'Get all reviews with pagination' })
  @ApiResponse({ status: 200, type: GetPaginationFullReviewDto })
  @ApiResponse({ status: 404, description: "Reviews not fount" })
  @Get("/pagination/:page/:limit?")
  async getAllWithPagination(@Param("page") page: number, @Param("limit") limit: number, @Query('search') search?: string, @Query('field') field?: string, @Query('type') type?: string) {
    return await this.reviewsService.getReviewsAllWithPagination(page, limit, search, field, type);
  }

  @ApiOperation({ summary: 'Get statistic reviews by project' })
  @ApiResponse({ status: 200, type: StaticticReviews })
  @Get("/statistic/:id")
  async getStaticticByProductSizeId(@Param("id") id: number) {
    return await this.reviewsService.getStaticticByProductSizeId(id);
  }

  @ApiBearerAuth('access-token')
  @Roles("admin")
  @UseGuards(JwtAuthGuard, RolesAuthGuard)
  @ApiOperation({ summary: "Update status item" })
  @ApiResponse({ status: 200, type: Review })
  @Patch()
  async update(@Body() dto: UpdateReviewDto) {
    return await this.reviewsService.update(dto);
  }

  @ApiBearerAuth('access-token')
  @Roles("admin")
  @UseGuards(JwtAuthGuard, RolesAuthGuard)
  @ApiOperation({ summary: 'Delete review by id' })
  @ApiResponse({ status: 200 })
  @Delete()
  async delete(@Body() dto: DeleteReviewDto) {
    return await this.reviewsService.delete(dto.id);
  }
}
