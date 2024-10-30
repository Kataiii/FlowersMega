import { Body, Controller, Get, HttpStatus, Ip, Post, Req, Res, UnauthorizedException, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';
import { AuthResponseDto } from './dto/response.dto';
import { Request, Response } from 'express';
import { RegistDto } from './dto/regist.dto';
import { stringify } from 'flatted';
import { RecoveryDto } from './dto/recovery.dto';
import { ChangePasswordDto } from './dto/changePassword.dto';
import { ResponseDto } from 'src/users/dto/user.dto';
import { ExtractToken } from 'src/utils/ExtractToken';
import { JwtAuthGuard } from './guards/jwt-auth.guard';


@ApiTags('Auth')
@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @ApiOperation({ summary: 'Log in system' })
    @ApiResponse({ status: 200, type: AuthResponseDto })
    @ApiResponse({ status: 400, description: 'Invalid password or login' })
    @Post('/login')
    async login(@Body() dto: AuthDto, @Res({ passthrough: true }) response: Response, @Ip() ip) {
        let tokens = await this.authService.login(dto, ip);
        response.cookie('refreshToken', tokens.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true });
        return tokens;
    }

    @ApiOperation({ summary: 'Registration in system' })
    @ApiResponse({ status: 200, type: AuthResponseDto })
    @ApiResponse({ status: 400, description: 'Such an account already exists' })
    @Post('/register')
    async registerUser(@Body() dto: RegistDto, @Ip() ip, @Res({ passthrough: true }) response: Response) {
        let tokens = await this.authService.register(dto, ip);
        response.cookie('refreshToken', tokens.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true });
        return tokens;
    }

    @ApiOperation({ summary: 'Log out of the system' })
    @Post('/logout')
    async logout(@Req() request: Request, @Res({ passthrough: true }) response: Response) {
        //TODO нет токена - разобраться с этим
        let refreshToken = request.cookies;
        const token = await this.authService.logout(refreshToken);
        response.clearCookie('refreshToken');
        return HttpStatus.OK;
    }

    @ApiOperation({ summary: 'Refresh token' })
    @ApiResponse({ status: 200, type: AuthResponseDto })
    @Post('/refresh')
    async refresh(@Req() request: Request, @Ip() ip) {
        const refresh = request.cookies;
        let refreshToken = stringify(refresh);
        refreshToken = refreshToken.slice(refreshToken.indexOf(",") + 2, refreshToken.length - 2);

        if (!refreshToken) {
            throw new UnauthorizedException;
        }
        return await this.authService.refresh(refreshToken, ip);
    }

    @ApiOperation({ summary: 'Recovery password, send letter' })
    @ApiResponse({ status: 200 })
    @Post('/recovery')
    async recoveryPassword(@Body() dto: RecoveryDto) {
        return await this.authService.recoveryPassword(dto.email);
    }

    @ApiOperation({ summary: "Change password" })
    @ApiResponse({ status: 200, type: ResponseDto })
    @Post("/change-password")
    async changePassword(@Body() dto: ChangePasswordDto, @Req() request: Request) {
        const response = await ExtractToken.checkAccessToken(ExtractToken.extractTokenFromHeader(request));
        return await this.authService.changePassword(dto, response.email, response.id);
    }
}
