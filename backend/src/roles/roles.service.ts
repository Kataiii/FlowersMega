import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Role } from './roles.model';

@Injectable()
export class RolesService {
    constructor(@InjectModel(Role) private rolesRepository: typeof Role){}

    async onModuleInit() {
        await this.seeds();
    }
      
    async seeds() {
        await this.rolesRepository.findOrCreate({
            where: {
                name: "user"
            }
        });
        await this.rolesRepository.findOrCreate({
            where: {
                name: "admin"
            }
        });
    }

    async create(name: string){
        return await this.rolesRepository.create({name: name});
    }

    async getById(id: number | string){
        const role = await this.rolesRepository.findOne({where: {id: id}});
        if(role === null) throw new HttpException("Role not found", HttpStatus.NOT_FOUND);
        return role;
    }

    async getByName(name: string){
        const role = await this.rolesRepository.findOne({where: {name: name}});
        if(role === null) throw new HttpException("Role not found", HttpStatus.NOT_FOUND);
        return role;
    }
}
