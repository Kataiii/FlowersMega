import { UnauthorizedException } from '@nestjs/common';
import { Request } from 'express';
import * as jwt from 'jsonwebtoken';


export class ExtractToken {
    public static extractTokenFromHeader(request: Request): string | undefined {
        const [type, token] = request.headers.authorization?.split(' ') ?? [];
        return type === 'Bearer' ? token : undefined;
    }

    public static async checkAccessToken(token: string){
        if (!token) {
            throw new UnauthorizedException();
        }
        const payload = await <jwt.JwtPayload>jwt.verify(token, process.env.PRIVATE_KEY);
        return payload;
    }
}