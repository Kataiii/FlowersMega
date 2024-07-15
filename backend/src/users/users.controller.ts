import { Body, Controller, Delete, Get, Param, Patch, Post, Req } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from './dto/createUser.dto';
import { UpdateUserDto } from './dto/updateUser.dto';
import { UsersService } from './users.service';
import { ResponseDto, UserDto } from './dto/user.dto';
import { Request } from 'express';
import { ExtractToken } from 'src/utils/ExtractToken';

@ApiTags("Users")
@Controller('users')
export class UsersController {
    constructor(private userService: UsersService){}

    @ApiOperation({summary: 'Create user'})
    @ApiResponse({status: 201, type: ResponseDto})
    @Post()
    async create(@Body() dto: CreateUserDto){
        const user = await this.userService.create(dto);
        const userDto: UserDto = user;
        return userDto;
    }

    @ApiOperation({summary: 'Get user by id'})
    @ApiResponse({status: 200, type: ResponseDto})
    @Get("/user")
    async getById(@Req() request: Request){
        const [type, token] = request.headers.authorization.split(' ');
        const accessToken = type === 'Bearer' ? token : undefined;
        const payload = await this.userService.checkAccountData(accessToken);
        const user = await this.userService.getById(payload.id);
        const userDto: UserDto = user;
        return userDto;
    }

    @ApiOperation({summary: 'Update user'})
    @ApiResponse({status: 200, type: ResponseDto})
    @Patch()
    async update(@Body() dto: UpdateUserDto, @Req() request: Request){
        const response = await ExtractToken.checkAccessToken(ExtractToken.extractTokenFromHeader(request));
        return await this.userService.update(dto, response.id);
    }

    @ApiOperation({summary: 'Delete user'})
    @ApiResponse({status: 200, type: ResponseDto})
    @Delete()
    async delete(@Req() request: Request){
        const [type, token] = request.headers.authorization.split(' ');
        const accessToken = type === 'Bearer' ? token : undefined;
        const payload = await this.userService.checkAccountData(accessToken);
        return await this.userService.delete(payload.id);
    }
}
