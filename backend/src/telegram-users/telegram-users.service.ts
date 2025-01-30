import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { TelegramUser } from './telegram-users.model';

@Injectable()
export class TelegramUsersService {

    constructor(@InjectModel(TelegramUser) private telegramUsersRepository: typeof TelegramUser){}

    async auth(user_tag: string, chat_id: number, access_key: string) {
        if (access_key == process.env.TELEGRAM_BOT_AUTH_TOKEN) {
            const existingUser = await this.telegramUsersRepository.findOne({ where: { chat_id: chat_id } });
            if (!existingUser) {
                await this.telegramUsersRepository.create({ user_tag, chat_id, is_active: true });
                console.log(`Пользователь ${user_tag} зарегистрирован в телеграм-боте!`);
                return {value: true, message: `Теперь ваш аккаунт зарегистрирован в телеграм-боте и вы будете получать уведомления о новых заказах на сайте, ${user_tag}!`};
            }
            if (existingUser.is_active === false) {
                this.telegramUsersRepository.update({is_active: true}, {where: { chat_id: chat_id }})
                console.log(`Доступ к рассылке телеграм-бота вновь выдан пользователю ${user_tag}!`);
                return {value: true, message: `Вы успешно подписались на рассылку телеграм-бота, ${user_tag}!`};
            }
            console.log(`Пользователь ${user_tag} получил доступ к телеграм-боту!`);
            return {value: true, message: `Вы уже подписаны на рассылку, ${user_tag}!`};
        } else {
            console.log(`Пользователь ${user_tag} ввел неверный ключ телеграм-бота!`);
            return {value: false, message: `Вы ввели некорректный ключ доступа к рассылке, ${user_tag}!`};
        }
    }

    async checkAccess(chat_id: number, access_key: string){
        console.log(chat_id);
        if(access_key !== process.env.TELEGRAM_BOT_COMMANDS_ACCESS) throw new UnauthorizedException();
        const existingUser = await this.telegramUsersRepository.findOne({ where: { chat_id: chat_id } });
            if (!existingUser) {
                console.log(`У чата ${chat_id} нет доступа к телеграм-боту!`);
                return {value: false, message: `У вас нет доступа к рассылке телеграм-бота!`};
            }
            if (existingUser.is_active === false) {
                console.log(`Пользователю ${existingUser.user_tag} запрещен доступ к телеграм-боту!`);
                return {value: false, message: `Вы отписаны от рассылки телеграм-бота!`};
            }
            return {value: false, message: `Вы подписаны на рассылку телеграм-бота!`};
    }

    async getUsers(access_key: string){
        if(access_key === process.env.TELEGRAM_BOT_COMMANDS_ACCESS)
            return await {users: await this.telegramUsersRepository.findAll({where: {is_active: true}}), message: "Список пользователей получен!"};
        else return {users: null, message: "Доступ запрещен!"}
    }

    async unsubscribe(chat_id: number){
        const existingUser = await this.telegramUsersRepository.findOne({where: {chat_id: chat_id}});
        if(existingUser?.is_active){
            this.telegramUsersRepository.update({is_active: false}, {where: {chat_id: chat_id}});
            return true;
        }
        return false;
    }
}
