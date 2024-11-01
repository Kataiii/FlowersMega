import { Body, Controller, Delete, Get, Param, Patch, Post, Req, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from './dto/createUser.dto';
import { UpdateUserDto } from './dto/updateUser.dto';
import { UsersService } from './users.service';
import { ResponseDto, UserDto } from './dto/user.dto';
import { Request } from 'express';
import { ExtractToken } from 'src/utils/ExtractToken';
import { FileInterceptor } from '@nestjs/platform-express';
import { Roles } from 'src/auth/guards/decorators/roles-auth.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesAuthGuard } from 'src/auth/guards/roles-auth.guard';

@ApiTags("Users")
@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) { }

  @ApiBearerAuth('access-token')
  @Roles("admin")
  @UseGuards(JwtAuthGuard, RolesAuthGuard)
  @ApiOperation({ summary: 'Create user' })
  @ApiResponse({ status: 201, type: ResponseDto })
  @Post()
  async create(@Body() dto: CreateUserDto) {
    const user = await this.userService.create(dto);
    const userDto: UserDto = user;
    return userDto;
  }

  @ApiBearerAuth('access-token')
  @Roles("admin")
  @UseGuards(JwtAuthGuard, RolesAuthGuard)
  @ApiOperation({ summary: 'Get user by id' })
  @ApiResponse({ status: 200, type: ResponseDto })
  @Get("/user")
  async getById(@Req() request: Request) {
    const [type, token] = request.headers.authorization.split(' ');
    const accessToken = type === 'Bearer' ? token : undefined;
    const payload = await this.userService.checkAccountData(accessToken);
    const user = await this.userService.getById(payload.id);
    const userDto: UserDto = user;
    return userDto;
  }

  @ApiBearerAuth('access-token')
  @Roles("admin", "user")
  @UseGuards(JwtAuthGuard, RolesAuthGuard)
  @ApiOperation({ summary: 'Update user' })
  @ApiResponse({ status: 200, type: ResponseDto })
  @Patch()
  async update(@Body() dto: UpdateUserDto, @Req() request: Request) {
    const response = await ExtractToken.checkAccessToken(ExtractToken.extractTokenFromHeader(request));
    return await this.userService.update(dto, response.id);
  }

  @ApiBearerAuth('access-token')
  @Roles("admin", "user")
  @UseGuards(JwtAuthGuard, RolesAuthGuard)
  @ApiOperation({ summary: 'Update avatar user' })
  @ApiResponse({ status: 200, type: ResponseDto })
  @Post("/avatar")
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @UseInterceptors(FileInterceptor('file'))
  async updateAvatar(@UploadedFile('file') file, @Req() request: Request) {
    const response = await ExtractToken.checkAccessToken(ExtractToken.extractTokenFromHeader(request));
    return await this.userService.updateAvatar(response.id, file);
  }

  @ApiOperation({ summary: 'Delete user' })
  @ApiResponse({ status: 200, type: ResponseDto })
  @Delete()
  async delete(@Req() request: Request) {
    const [type, token] = request.headers.authorization.split(' ');
    const accessToken = type === 'Bearer' ? token : undefined;
    const payload = await this.userService.checkAccountData(accessToken);
    return await this.userService.delete(payload.id);
  }
}
