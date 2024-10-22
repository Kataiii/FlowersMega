import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { Observable } from "rxjs";
import {Reflector} from "@nestjs/core";
import { ROLES_KEY } from "./decorators/roles-auth.decorator";
import { HttpException } from "@nestjs/common/exceptions";
import { HttpStatus } from "@nestjs/common/enums";
import * as jwt from 'jsonwebtoken';

@Injectable()
export class RolesAuthGuard implements CanActivate{
    constructor(private readonly reflector: Reflector){}

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const req = context.switchToHttp().getRequest();

        try{
            const requiredRoles = this.reflector.getAllAndOverride<string[]>(ROLES_KEY, [
                context.getHandler(),
                context.getClass()
            ]);
            if(!requiredRoles){
                return true;
            }

            const authHeader = req.headers.authorization;
            const bearer = authHeader.split(' ')[0];
            const token = authHeader.split(' ')[1];

            if(bearer !== 'Bearer' || !token){
                throw new UnauthorizedException({message: 'Пользователь не авторизован'})
            }
            const account = <jwt.JwtPayload>jwt.verify(token, process.env.PRIVATE_KEY);
            req.account = account;
            return account.roles.some(role => requiredRoles.includes(role.name));
        } catch(e){
            throw new HttpException('Нет доступа', HttpStatus.FORBIDDEN);
        }
    }
}