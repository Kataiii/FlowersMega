import { Body, Controller, Get, Param, Post, UploadedFiles, UseGuards, UseInterceptors } from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/auth/guards/decorators/roles-auth.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesAuthGuard } from 'src/auth/guards/roles-auth.guard';
import { CreateProductDto } from './dto/createProduct.dto';
import { Product } from './products.model';
import { ProductsService } from './products.service';

@ApiTags("Products")
@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductsService) { }

  @ApiBearerAuth('access-token')
  @Roles("admin")
  @UseGuards(JwtAuthGuard, RolesAuthGuard)
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

  @ApiBearerAuth('access-token')
  @Roles("admin")
  @UseGuards(JwtAuthGuard, RolesAuthGuard)
  @ApiOperation({ summary: 'Get all products' })
  @ApiResponse({ status: 200, type: [Product] })
  @ApiResponse({ status: 404, description: "Products not fount" })
  @Get()
  async getAll() {
    return await this.productsService.getAll();
  }

  @ApiBearerAuth('access-token')
  @Roles("admin")
  @UseGuards(JwtAuthGuard, RolesAuthGuard)
  @ApiOperation({ summary: 'Get product by id' })
  @ApiResponse({ status: 200, type: Product })
  @ApiResponse({ status: 404, description: "Product not fount" })
  @Get("/:id")
  async getById(@Param("id") id: number) {
    return await this.productsService.getById(id);
  }

  @ApiBearerAuth('access-token')
  @Roles("admin")
  @UseGuards(JwtAuthGuard, RolesAuthGuard)
  @ApiOperation({ summary: 'Get count product sizes by id' })
  @ApiResponse({ status: 200, description: 'Count product sizes' })
  @ApiResponse({ status: 404, description: 'Product not found' })
  @Get(':id/product-sizes/count')
  async getProductSizesCount(@Param('id') productId: number): Promise<{ count: number }> {
    const count = await this.productsService.countProductSizesByProductId(productId);
    return { count };
  }
}
