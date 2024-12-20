import { Body, Controller, Get, Param, Post, UseInterceptors } from '@nestjs/common';
import { Delete, UploadedFile, UseGuards } from '@nestjs/common/decorators';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/auth/guards/decorators/roles-auth.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesAuthGuard } from 'src/auth/guards/roles-auth.guard';
import { Category } from './categories.model';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/createCategory.dto';
import { DeleteCategoryDto } from './dto/deleteCategory.dto';
import { GetPaginationCategoriesDto } from './dto/getPagination.dto';

@ApiTags("Categories")
@Controller('categories')
export class CategoriesController {
    constructor(private categoriesService : CategoriesService){}

    @ApiBearerAuth('access-token')
    @Roles("admin")
    @UseGuards(JwtAuthGuard, RolesAuthGuard)
    @ApiOperation({summary: 'Create category'})
    @ApiResponse({status: 201, type: Category})
    @ApiConsumes('multipart/form-data')
    @ApiBody({
        schema: {
          type: 'object',
          properties: {
            name: { type: 'string' },
            file: {
              type: 'string',
              format: 'binary',
            },
          },
        },
      })
    @UseInterceptors(FileInterceptor('file'))
    @Post()
    async create(@Body()dto: CreateCategoryDto, @UploadedFile('file') file){
        return await this.categoriesService.create(dto, file);
    }

    @ApiOperation({summary: 'Get all categories'})
    @ApiResponse({status: 200, type: [Category]})
    @ApiResponse({status: 404, description: "Categories not fount"})
    @Get()
    async getAll(){
        return await this.categoriesService.getAll();
    }

    @ApiOperation({summary: 'Get category by id'})
    @ApiResponse({status: 200, type: Category})
    @ApiResponse({status: 404, description: "Category not fount"})
    @Get("/:id")
    async getById(@Param("id") id: number){
        return await this.categoriesService.getById(id);
    }

    @ApiOperation({summary: 'Get categories with pagination'})
    @ApiResponse({status: 200, type: GetPaginationCategoriesDto})
    @Get('/pagination/:page/:limit')
    async getPagination(@Param("page") page: number, @Param("limit") limit: number){
        return await this.categoriesService.getAllCountAndPagination(page, limit);
    }

    @ApiBearerAuth('access-token')
    @Roles("admin")
    @UseGuards(JwtAuthGuard, RolesAuthGuard)
    @ApiOperation({summary: "Delete category by id"})
    @ApiResponse({status: 200, type: Category})
    @Delete()
    async delete(@Body() dto: DeleteCategoryDto){
      return await this.categoriesService.delete(dto.id);
    }
}
