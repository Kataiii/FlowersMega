import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateUserDto } from './dto/createUser.dto';
import { UpdateUserDto } from './dto/updateUser.dto';
import { UserDto } from './dto/user.dto';
import { User } from './users.model';

@Injectable()
export class UsersService {
    constructor(@InjectModel(User) private userRepository: typeof User){}

    async create(dto: CreateUserDto){
        const user = await this.userRepository.create(dto);
        const userDto: UserDto = user;
        return userDto;
    }

    async getById(id: number | string){
        const user = await this.userRepository.findOne({where: {id: id}});
        if( user === null) throw new HttpException("User not found", HttpStatus.NOT_FOUND);
        const userDto: UserDto = user;
        return userDto;
    }

    async update(dto: UpdateUserDto, id: number){
        const idUser = await this.userRepository.update(dto, {where: {id}});
        const user = await this.userRepository.findOne({where: {id: idUser}});
        const userDto: UserDto = user;
        return userDto;
    }

    async delete(id: number){
        const idUser = await this.userRepository.destroy({where: {id: id}});
        const user = await this.userRepository.findOne({where: {id: idUser}});
        const userDto: UserDto = user;
        return userDto;
    }
}
