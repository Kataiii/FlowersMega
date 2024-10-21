import { Body, Controller, Delete, Get, Param, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/auth/guards/decorators/roles-auth.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesAuthGuard } from 'src/auth/guards/roles-auth.guard';
import { CreateSizeDto } from './dto/createSize.dto';
import { DeleteSizeDto } from './dto/deleteSize.dto';
import { Size } from './sizes.model';
import { SizesService } from './sizes.service';

@ApiTags("Sizes")
@Controller('sizes')
export class SizesController {
    constructor(private sizesService : SizesService){}

    @ApiBearerAuth('access-token')
    @Roles("admin")
    @UseGuards(JwtAuthGuard, RolesAuthGuard)
    @ApiOperation({summary: 'Create size'})
    @ApiResponse({status: 201, type: Size})
    @Post()
    async create(@Body()dto: CreateSizeDto){
        return await this.sizesService.create(dto);
    }

    @ApiBearerAuth('access-token')
    @Roles("admin")
    @UseGuards(JwtAuthGuard, RolesAuthGuard)
    @ApiOperation({summary: 'Get all sizes'})
    @ApiResponse({status: 200, type: [Size]})
    @ApiResponse({status: 404, description: "Sizes not fount"})
    @Get()
    async getAll(){
        return await this.sizesService.getAll();
    }

    @ApiOperation({summary: 'Get size by id'})
    @ApiResponse({status: 200, type: Size})
    @ApiResponse({status: 404, description: "Size not fount"})
    @Get("/:id")
    async getById(@Param("id") id: number){
        return await this.sizesService.getById(id);
    }

    @ApiBearerAuth('access-token')
    @Roles("admin")
    @UseGuards(JwtAuthGuard, RolesAuthGuard)
    @ApiOperation({summary: 'Delete size by id'})
    @ApiResponse({status: 200, type: Size})
    @Delete()
    async delete(@Body() dto: DeleteSizeDto){
        return await this.sizesService.delete(dto.id);
    }
}
