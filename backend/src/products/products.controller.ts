import { Body, Controller, Get, Param, Post, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiConsumes, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateProductDto } from './dto/createProduct.dto';
import { Product } from './products.model';
import { ProductsService } from './products.service';

@ApiTags("Products")
@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductsService) { }

  @ApiOperation({ summary: 'Create product' })
  @ApiResponse({ status: 201, type: Product })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        name: { type: 'string' },
        description: { type: 'string' },
        structure: { type: 'string' },
        idTypeProduct: { type: 'number' },
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
  async create(@Body() dto: CreateProductDto, @UploadedFiles() files) {
    return await this.productsService.create(dto, files);
  }

  @ApiOperation({ summary: 'Get all products' })
  @ApiResponse({ status: 200, type: [Product] })
  @ApiResponse({ status: 404, description: "Products not fount" })
  @Get()
  async getAll() {
    return await this.productsService.getAll();
  }

  @ApiOperation({ summary: 'Get product by id' })
  @ApiResponse({ status: 200, type: Product })
  @ApiResponse({ status: 404, description: "Product not fount" })
  @Get("/:id")
  async getById(@Param("id") id: number) {
    return await this.productsService.getById(id);
  }
}
