import { forwardRef, HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateUserDto } from './dto/createUser.dto';
import { UpdateUserDto } from './dto/updateUser.dto';
import { UserDto } from './dto/user.dto';
import { User } from './users.model';
import * as jwt from 'jsonwebtoken';
import { AuthService } from '../auth/auth.service';
import { FilesService } from 'src/files/files.service';

@Injectable()
export class UsersService {
    constructor(
        @InjectModel(User) private userRepository: typeof User,
        private filesService: FilesService
    ){}

    async create(dto: CreateUserDto){
        const user = await this.userRepository.create(dto);
        return user;
    }

    async getById(id: number | string){
        const user = await this.userRepository.findOne({where: {id: id}});
        if( user === null) throw new HttpException("User not found", HttpStatus.NOT_FOUND);
        return user;
    }

    async update(dto: UpdateUserDto, id: number){
        const idUser = await this.userRepository.update(dto, {where: {id}});
        const user = await this.userRepository.findOne({where: {id: id}});
        const userDto: UserDto = user;
        return userDto;
    }

    async updateAvatar(idUser: number, file?: File | null){
        const user = await this.userRepository.findOne({where: {id: idUser}});
        if(user.urlAvatar !== undefined) await this.filesService.deleteAvatar(user.urlAvatar, idUser);
        let fileName;
        if(file !== undefined) {
            fileName = await this.filesService.createAvatar(file, idUser);
        }

        await this.userRepository.update({urlAvatar: file === null ? null : fileName}, {where: {id: idUser}});

        const userDto: UserDto = user;
        userDto.urlAvatar = fileName;
        return userDto;
    }

    async delete(id: number){
        const idUser = await this.userRepository.destroy({where: {id: id}});
        const user = await this.userRepository.findOne({where: {id: idUser}});
        const userDto: UserDto = user;
        return userDto;
    }

    async getByEmail(email: string){
        const user = this.userRepository.findOne({ where: {email: email} });
        if( user === null) throw new HttpException("User not found", HttpStatus.NOT_FOUND);
        return user;
    }

    private async validateAccessToken(accessToken){
        try{
            const accountData = jwt.verify(accessToken, process.env.PRIVATE_KEY);
            return accountData;
        } catch(e){
            return null;
        }
    }

    async checkAccountData(accessToken: string | undefined){
        return <jwt.JwtPayload>this.validateAccessToken(accessToken);
    }
}
