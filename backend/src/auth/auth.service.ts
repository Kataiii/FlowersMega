import { forwardRef, HttpException, HttpStatus, Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { TokensService } from '../tokens/tokens.service';
import { UsersService } from '../users/users.service';
import { AuthDto } from './dto/auth.dto';
import * as bcryptjs from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import { User } from 'src/users/users.model';
import { UserDto } from 'src/users/dto/user.dto';
import { RegistDto } from './dto/regist.dto';
import { PayloadToken } from './dto/payloadToken.dto';

@Injectable()
export class AuthService {
    constructor(
        private tokensService: TokensService,
        private usersService: UsersService
    ){}

    async login(dto: AuthDto, ip){
        const user = await this.validateUser(dto);
        const refreshToken = this.tokensService.generateRefreshToken(user, dto.rememberMe);
        await this.tokensService.saveRefreshToken(refreshToken, user.id, ip);
        const accessToken = await this.generateToken(user);
        const userDto: UserDto = user;
        return {
            refreshToken: refreshToken,
            accessToken: accessToken,
            user: userDto
        };
    }

    async register(dto: RegistDto, ip){
        let user = await this.usersService.getByEmail(dto.email);
        if(user != null) throw new HttpException("Such an account already exists", HttpStatus.BAD_REQUEST);
        const hashPassword = await bcryptjs.hash(dto.password, 10);
        user = await this.usersService.create({
            firstname: dto.name,
            phone: dto.phone,
            email: dto.email,
            password: hashPassword
        });
        // this.activationLinksService.create(account.id);

        const refreshToken = this.tokensService.generateRefreshToken(user, false);
        await this.tokensService.saveRefreshToken(refreshToken, user.id, ip);
        const accessToken = await this.generateToken(user);

        const userDto: UserDto = user;
        return {
            refreshToken: refreshToken,
            accessToken: accessToken,
            user: userDto
        };
    }

    private async generateToken(user: User){
        const payload: PayloadToken = {email: user.email, id: user.id}
        const tokenAccess = await jwt.sign(payload, process.env.PRIVATE_KEY, {expiresIn: '15m'});
        return tokenAccess;
    }

    async refresh(refreshToken, ip){
        const accountData = await this.tokensService.validateRefreshToken(refreshToken);
        const tokenData = await this.tokensService.findRefreshToken(refreshToken);
        console.log('token data ', tokenData);
        if(!accountData || !tokenData){
            throw new UnauthorizedException;
        }
        const user = await this.usersService.getById(accountData.id);
        const refreshTokenNew = this.tokensService.generateRefreshToken(user, true);
        await this.tokensService.saveRefreshToken(refreshToken, user.id, ip);
        const accessToken = await this.generateToken(user);

        const userDto: UserDto = user;
        return {
            refreshToken: refreshTokenNew,
            accessToken: accessToken,
            user: userDto
        };
    }

    async validateAccessToken(accessToken){
        try{
            const accountData = jwt.verify(accessToken, process.env.PRIVATE_KEY);
            return accountData;
        } catch(e){
            return null;
        }
    }

    async logout(refreshToken){
        const tokenValue = refreshToken.refreshToken;
        const token = await this.tokensService.removeToken(tokenValue);
        return token;
    }

    private async validateUser(dto: AuthDto){
        const user = await this.usersService.getByEmail(dto.email);
        if(user != null){
            const passwordEqual = await bcryptjs.compare(dto.password, user.password);
            if(user && passwordEqual){
                return user;
            }
        }
        throw new UnauthorizedException('Invalid password or login');
    }

    async recoveryPassword(email: string){
        const user = await this.usersService.getByEmail(email);
        if(user != null) {
            // return await this.recoveryLinksService.create(account.id);
        }
        throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
}
