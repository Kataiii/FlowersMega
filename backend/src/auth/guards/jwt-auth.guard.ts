import { CanActivate, ExecutionContext, UnauthorizedException } from "@nestjs/common";
import { Injectable } from "@nestjs/common/decorators";
import { Reflector } from "@nestjs/core";
import * as jwt from 'jsonwebtoken';
import { ExtractToken } from "src/utils/ExtractToken";

@Injectable()
export class JwtAuthGuard implements CanActivate {
    constructor(private readonly reflector: Reflector) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const isPublic = this.reflector.get<boolean>('isPublic', context.getHandler());
        if (isPublic) return true;

        const request = context.switchToHttp().getRequest();
        try {
            const token = ExtractToken.extractTokenFromHeader(request);
            if (!token) {
                throw new UnauthorizedException();
            }
            const payload = await <jwt.JwtPayload>jwt.verify(token, process.env.PRIVATE_KEY);
            request['account'] = payload;
            return true;
        } catch (e) {
            throw new UnauthorizedException;
        }
    }
}