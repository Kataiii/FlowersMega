import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateUserRoleDto } from './dto/create-users-roles.dto';
import { UsersRoles } from './users-roles.model';

@Injectable()
export class UsersRolesService {
    constructor(@InjectModel(UsersRoles) private usersRolesRepository: typeof UsersRoles){}

    async getByIdUser(id: number | string){
        const relation = await this.usersRolesRepository.findOne({where: {userId: id}});
        if(relation === null) throw new HttpException("Role not found", HttpStatus.NOT_FOUND);
        return relation;
    }

    async create(dto: CreateUserRoleDto){
        return await this.usersRolesRepository.create(dto);
    }

    async findOrCreate(dto:CreateUserRoleDto){
        return await this.usersRolesRepository.findOrCreate({
            where: {
                userId: dto.userId,
                roleId: dto.roleId
            }
        })
    }

    async getAllByUserId(id: number){
        return await this.usersRolesRepository.findAll({where: {userId: id}});
    }
}
