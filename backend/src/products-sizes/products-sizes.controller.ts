import { Body, Controller, Delete, Get, Param, Post, Query, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Product } from 'src/products/products.model';
import { AllSizesDto } from './dto/allSizes.dto';
import { CreateFullProductSizeDto } from './dto/createFullProduct.dto';
import { CreateProductSizeDto, CreateProductSizeInfoDto } from './dto/createProductsSizes.dto';
import { FullProductSizeDto } from './dto/fullProductsSizes.dto';
import { GetPaginationProductSizeDto } from './dto/getPagination.dto';
import { ProductsSizesFullService } from './products-sizes-full.service';
import { ProductSize } from './products-sizes.model';
import { ProductsSizesService } from './products-sizes.service';
import { filter, min } from 'rxjs';
import { CategoriesProductsService } from 'src/categories-products/categories-products.service';
import { Roles } from 'src/auth/guards/decorators/roles-auth.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesAuthGuard } from 'src/auth/guards/roles-auth.guard';

@ApiTags("Products Sizes")
@Controller('products-sizes')
export class ProductsSizesController {
    constructor(
        private productsSizesService: ProductsSizesService,
        private productsSizesFullService: ProductsSizesFullService,
        private categoriesService: CategoriesProductsService
    ) { }

    @ApiBearerAuth('access-token')
    @Roles("admin")
    @UseGuards(JwtAuthGuard, RolesAuthGuard)
    @ApiOperation({ summary: 'Create product size' })
    @ApiResponse({ status: 201, type: ProductSize })
    @Post()
    async create(@Body() dto: CreateProductSizeDto) {
        return await this.productsSizesService.create(dto);
    }

    @ApiBearerAuth('access-token')
    @Roles("admin")
    @UseGuards(JwtAuthGuard, RolesAuthGuard)
    @ApiOperation({ summary: "Create full product" })
    @ApiResponse({ status: 201, type: Product })
    @Post('/full-product')
    @ApiConsumes('multipart/form-data')
    @ApiBody({
        schema: {
            type: 'object',
            properties: {
                name: { type: 'string' },
                type: { type: 'number' },
                description: { type: 'string' },
                structure: { type: 'string' },
                photo: {
                    type: 'string',
                    format: 'binary'
                },
                productSize: {
                    type: 'array',
                    items:
                    {
                        type: 'object',
                        format: 'object',
                        properties: {
                            idSize: { type: 'number' },
                            prise: { type: 'number' },
                            paramsSize: { type: 'string' }
                        }
                    }
                },
                categories: {
                    type: 'array',
                    items: {
                        type: 'object',
                        format: 'object',
                        properties: {
                            id: { type: 'number' },
                            name: { type: 'string' },
                            photo: { type: 'string' }
                        }
                    }
                },
                filters: {
                    type: 'array',
                    items: {
                        type: 'object',
                        format: 'object',
                        properties: {
                            filter: {
                                type: 'object',
                                properties: {
                                    id: { type: 'number' },
                                    name: { type: 'string' }
                                }
                            },
                            tags: {
                                type: 'array',
                                items: {
                                    type: 'object',
                                    properties: {
                                        id: { type: 'number' },
                                        name: { type: 'string' },
                                        idFilter: { type: 'number' }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    })
    @UseInterceptors(FileInterceptor('photo'))
    async createFullProduct(@Body() dto: CreateFullProductSizeDto, @UploadedFile() photo) {
        return await this.productsSizesFullService.createFullProduct(dto, photo);
    }

    @ApiOperation({ summary: 'Get all products sizes' })
    @ApiResponse({ status: 200, type: [ProductSize] })
    @ApiResponse({ status: 404, description: "Products sizes not fount" })
    @Get()
    async getAll() {
        return await this.productsSizesService.getAll();
    }

    @ApiOperation({ summary: 'Get categories with pagination' })
    @ApiResponse({ status: 200, type: GetPaginationProductSizeDto })
    @Get('/pagination/:page/:limit')
    async getPagination(@Param("page") page: number, @Param("limit") limit: number) {
        return await this.productsSizesService.getAllWithPagination(page, limit);
    }

    @ApiOperation({ summary: 'Get all sizes by product id' })
    @ApiResponse({ status: 200, type: AllSizesDto })
    @Get('/all-sizes/:id')
    async getAllSizesByProductId(@Param("id") id: number) {
        return await this.productsSizesService.getWithAllSizes(id);
    }

    @ApiOperation({ summary: "Get product size by product id and size id" })
    @ApiResponse({ status: 200, type: ProductSize })
    @Get("/product-size/:idProduct/:idSize")
    async getByProductIdAndSizeId(@Param("idProduct") idProduct: number, @Param("idSize") idSize: number) {
        return await this.productsSizesService.getBySizeIdByProductId(idSize, idProduct);
    }

    @ApiOperation({ summary: 'Get product size by id' })
    @ApiResponse({ status: 200, type: ProductSize })
    @ApiResponse({ status: 404, description: "Product size not fount" })
    @Get("/:id")
    async getById(@Param("id") id: number) {
        return await this.productsSizesService.getById(id);
    }

    @ApiOperation({ summary: 'Get product sizes by product id' })
    @ApiResponse({ status: 200, type: [ProductSize] })
    @ApiResponse({ status: 404, description: "Products sizes not fount" })
    @Get("/product/:id")
    async getByProductId(@Param("id") id: number) {
        return await this.productsSizesService.getByProductId(id);
    }

    @ApiOperation({ summary: 'Get full info product sizes by product id' })
    @ApiResponse({ status: 200, type: FullProductSizeDto })
    @Get("/full-product/:id")
    async getProductSizeForCardById(@Param("id") id: number) {
        return await this.productsSizesFullService.getFullById(id);
    }

    @ApiOperation({ summary: 'Get product sizes for cards with pagination' })
    @ApiResponse({ status: 200, type: [FullProductSizeDto] })
    @ApiResponse({ status: 404, description: "Products sizes not fount" })
    @ApiQuery({ name: 'search', required: false })
    @ApiQuery({ name: 'filterItems', required: false })
    @ApiQuery({ name: 'category', required: false })
    @Get("/full-products-cards/:page/:limit")
    async getByCategotyIdWithPagination(@Param("page") page: number, @Param("limit") limit: number, @Query("search") search?: string, @Query("filterItems") filterItems?: string, @Query("minPrice") minPrice?: number, @Query("maxPrice") maxPrice?: number, @Query("category") category?: number) {

        console.log(category, "CATEGORY");
        const arrayFilters: number[] = filterItems !== undefined && filterItems !== "" ? filterItems.split(',').map(item => Number(item)) : [];
        return await this.productsSizesFullService.getProductsSizesForCardPagination(page, limit, search, arrayFilters, minPrice, maxPrice, category);
    }

    @ApiOperation({ summary: 'Get product with products size with pagination' })
    @ApiResponse({ status: 200, type: [FullProductSizeDto] })
    @ApiResponse({ status: 404, description: "Products sizes not fount" })
    @ApiQuery({ name: 'filters', required: false })
    @ApiQuery({ name: 'categories', required: false })
    @ApiQuery({ name: 'search', required: false })
    @Get("/products-with-pagination/:page/:limit?")
    async getProductWithProductSizeWithPagination(@Param("page") page: number, @Param("limit") limit: number, @Query("search") search?: string, @Query("field") field?: string, @Query("type") type?: string, @Query("categories") categories?: string, @Query("filters") filters?: string) {
        // console.log(categories, "CATEGORY");
        const arrayCategories: number[] = categories !== undefined && categories !== "" ? categories.split(',').map(item => Number(item)) : [];
        const arrayFilters: number[] = filters !== undefined && filters !== "" ? filters.split(',').map(item => Number(item)) : [];
        return await this.productsSizesFullService.getProductsWithPagination(page, limit, search, field, type, arrayCategories, arrayFilters);
    }

    @ApiBearerAuth('access-token')
    @Roles("admin")
    @UseGuards(JwtAuthGuard, RolesAuthGuard)
    @ApiOperation({ summary: 'Delete product and its sizes by product id' })
    @ApiResponse({ status: 200, description: 'Product and its sizes deleted successfully' })
    @ApiResponse({ status: 404, description: 'Product not found' })
    @Delete('/product/:id')
    async deleteProductWithSizes(@Param("id") id: number) {
        const deletedProductSizesCount = await this.productsSizesFullService.deleteProductWithSizes(id);
        return { message: `Product and ${deletedProductSizesCount} associated sizes deleted successfully.` };
    }

    @ApiOperation({ summary: 'Get categoryId by name' })
    @ApiResponse({ status: 200 })
    @ApiResponse({ status: 404, description: "Category not fount" })
    @Get("/category/:name")
    async getCategoryIdByName(@Param("name") name: string) {
        console.log(name, "CATEGORYPPPPPPPP");
        const response = await this.categoriesService.getCategoryByName(name);
        console.log(response);
        return response;
    }
}
