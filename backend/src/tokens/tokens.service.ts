import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from 'src/users/users.model';
import { Token } from './tokens.model';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class TokensService {
    constructor(@InjectModel(Token) private tokensRepository: typeof Token){}

    generateRefreshToken(user: User, rememberMe: boolean): string{
        const payload = {email: user.email, id: user.id}
        return jwt.sign(payload, process.env.PRIVATE_KEY_REFRESH, {expiresIn: rememberMe ? '30d' : '1d'});
    }

    async saveRefreshToken(refreshToken: string, idUser: number, ip: string){
        const tokens = await this.tokensRepository.findAll({where: {idUser: idUser}});
        const deleteTokens = tokens.filter(token => Date.now() - token.createdAt >= 30);
        for(let i: number = 0; i < deleteTokens.length; i++){
            await this.tokensRepository.destroy({where: {id: deleteTokens[i].id}});
        }

        const token = await this.tokensRepository.create({
            refreshToken: refreshToken,
            idUser: idUser,
            ip: ip
        });
        return token;
    }

    async removeToken(refreshToken) {
        const tokenData = await this.tokensRepository.destroy({ where: { refreshToken: String(refreshToken) } });
        return tokenData;
    }

    async validateRefreshToken(refreshToken){
        try{
            const accountData = <jwt.JwtPayload>jwt.verify(refreshToken, process.env.PRIVATE_KEY_REFRESH);
            return accountData;
        } catch(e){
            return null;
        }
    }

    async findRefreshToken(refreshToken){
        const tokenData = await this.tokensRepository.findOne({where: {refreshToken: refreshToken}});
        return tokenData;
    }
}
