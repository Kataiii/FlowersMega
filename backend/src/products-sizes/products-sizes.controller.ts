import { Body, Controller, Get, Param, Post, Query, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiConsumes, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Product } from 'src/products/products.model';
import { AllSizesDto } from './dto/allSizes.dto';
import { CreateFullProductSizeDto } from './dto/createFullProduct.dto';
import { CreateProductSizeDto, CreateProductSizeInfoDto } from './dto/createProductsSizes.dto';
import { FullProductSizeDto } from './dto/fullProductsSizes.dto';
import { GetPaginationProductSizeDto } from './dto/getPagination.dto';
import { ProductsSizesFullService } from './products-sizes-full.service';
import { ProductSize } from './products-sizes.model';
import { ProductsSizesService } from './products-sizes.service';

@ApiTags("Products Sizes")
@Controller('products-sizes')
export class ProductsSizesController {
    constructor(
        private productsSizesService : ProductsSizesService,
        private productsSizesFullService: ProductsSizesFullService
    ){}

    @ApiOperation({summary: 'Create product size'})
    @ApiResponse({status: 201, type: ProductSize})
    @Post()
    async create(@Body()dto: CreateProductSizeDto){
        return await this.productsSizesService.create(dto);
    }

    @ApiOperation({summary: "Create full product"})
    @ApiResponse({status: 201, type: Product})
    @Post('/full-product')
    @ApiConsumes('multipart/form-data')
    @ApiBody({
        schema: {
            type: 'object',
            properties: {
                name: {type: 'string'},
                type:{type: 'number'},
                description: {type: 'string'},
                structure: {type: 'string'},
                photo:  {
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
                            idSize: {type: 'number'},
                            prise: {type: 'number'},
                            paramsSize: {type: 'string'}
                        }
                    }
                },
                categories: {
                    type: 'array',
                    items: {
                        type: 'object',
                        format: 'object',
                        properties: {
                            id: {type: 'number'},
                            name: {type: 'string'},
                            photo: {type: 'string'}
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
                                    id: {type: 'number'},
                                    name: {type: 'string'}
                                }
                            },
                            tags: {
                                type: 'array',
                                items: {
                                    type: 'object',
                                    properties: {
                                        id: {type: 'number'},
                                        name: {type: 'string'},
                                        idFilter: {type: 'number'}
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
    async createFullProduct(@Body() dto:CreateFullProductSizeDto, @UploadedFile() photo){
        return await this.productsSizesFullService.createFullProduct(dto, photo);
    }

    @ApiOperation({summary: 'Get all products sizes'})
    @ApiResponse({status: 200, type: [ProductSize]})
    @ApiResponse({status: 404, description: "Products sizes not fount"})
    @Get()
    async getAll(){
        return await this.productsSizesService.getAll();
    }

    @ApiOperation({summary: 'Get categories with pagination'})
    @ApiResponse({status: 200, type: GetPaginationProductSizeDto})
    @Get('/pagination/:page/:limit')
    async getPagination(@Param("page") page: number, @Param("limit") limit: number){
        return await this.productsSizesService.getAllWithPagination(page, limit);
    }

    @ApiOperation({summary: 'Get all sizes by product id'})
    @ApiResponse({status: 200, type: AllSizesDto})
    @Get('/all-sizes/:id')
    async getAllSizesByProductId(@Param("id") id: number){
        return await this.productsSizesService.getWithAllSizes(id);
    }
    
    @ApiOperation({summary: "Get product size by product id and size id"})
    @ApiResponse({status: 200, type: ProductSize})
    @Get("/product-size/:idProduct/:idSize")
    async getByProductIdAndSizeId(@Param("idProduct") idProduct: number, @Param("idSize") idSize: number){
        return await this.productsSizesService.getBySizeIdByProductId(idSize, idProduct);
    }

    @ApiOperation({summary: 'Get product size by id'})
    @ApiResponse({status: 200, type: ProductSize})
    @ApiResponse({status: 404, description: "Product size not fount"})
    @Get("/:id")
    async getById(@Param("id") id: number){
        return await this.productsSizesService.getById(id);
    }

    @ApiOperation({summary: 'Get product sizes by product id'})
    @ApiResponse({status: 200, type: [ProductSize]})
    @ApiResponse({status: 404, description: "Products sizes not fount"})
    @Get("/product/:id")
    async getByProductId(@Param("id") id: number){
        return await this.productsSizesService.getByProductId(id);
    }

    @ApiOperation({summary: 'Get full info product sizes by product id'})
    @ApiResponse({status: 200, type: FullProductSizeDto})
    @Get("/full-product/:id")
    async getProductSizeForCardById(@Param("id") id: number){
        return await this.productsSizesFullService.getFullById(id);
    }

    @ApiOperation({summary: 'Get product sizes for cards with pagination'})
    @ApiResponse({status: 200, type: [FullProductSizeDto]})
    @ApiResponse({status: 404, description: "Products sizes not fount"})
    @Get("/full-products-cards/:page/:limit")
    async getByCategotyIdWithPagination(@Param("page") page: number, @Param("limit") limit: number){
        return await this.productsSizesFullService.getProductsSizesForCardPagination(page, limit);
    }

    @ApiOperation({summary: 'Get product with products size with pagination'})
    @ApiResponse({status: 200, type: [FullProductSizeDto]})
    @ApiResponse({status: 404, description: "Products sizes not fount"})
    @Get("/products-with-pagination/:page/:limit?")
    async getProductWithProductSizeWithPagination(@Param("page") page: number, @Param("limit") limit: number, @Query("search") search?: string){
        return await this.productsSizesFullService.getProductsWithPagination(page, limit, search);
    }
}
