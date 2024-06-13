import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from './dto/createUser.dto';
import { UpdateUserDto } from './dto/updateUser.dto';
import { UsersService } from './users.service';
import { ResponseDto } from './dto/user.dto';

@ApiTags("Users")
@Controller('users')
export class UsersController {
    constructor(private userService: UsersService){}
    //TODO переделать всё на токены и возвращать dto без id

    @ApiOperation({summary: 'Create user'})
    @ApiResponse({status: 201, type: ResponseDto})
    @Post()
    async create(@Body() dto: CreateUserDto){
        const user = await this.userService.create(dto);
    }

    @ApiOperation({summary: 'Get user by id'})
    @ApiResponse({status: 200, type: ResponseDto})
    @Get("/:id")
    async getById(@Param("id") id: number){
        return await this.userService.getById(id);
    }

    @ApiOperation({summary: 'Update user'})
    @ApiResponse({status: 200, type: ResponseDto})
    @Patch()
    async update(@Body() dto: UpdateUserDto){
        //TODO передавать id из токена
        return await this.userService.update(dto, 1);
    }

    @ApiOperation({summary: 'Delete user'})
    @ApiResponse({status: 200, type: ResponseDto})
    @Delete()
    async delete(){
         //TODO передавать id из токена
        return await this.userService.delete(1);
    }
}
