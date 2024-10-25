import { Injectable, Logger } from "@nestjs/common";
import { TelegramService } from "nestjs-telegram";
import { OrderCallDto } from "./dto/orderCall.dto";
import { TelegramUsersService } from "src/telegram-users/telegram-users.service";
const TelegramBot = require('node-telegram-bot-api');

@Injectable()
export class TgBotService {
    private readonly bot: any;
    private logger = new Logger(TgBotService.name);

    constructor(
        private readonly telegramUsersService: TelegramUsersService, // Сервис пользователей
    ) {
        this.bot = new TelegramBot(process.env.TOKEN_BOT, { polling: true });

        // Установка команд с подсказками
        this.bot.setMyCommands([
            { command: '/status', description: 'Проверить статус подписки' },
            { command: '/subscribe', description: 'Авторизация по токену доступа' },
            { command: '/unsubscribe', description: 'Перестать получать рассылку' },
        ]);

        // Обработчик команды "/status"
        this.bot.onText(/\/status/, (msg: any) => {
            this.handleStatusCommand(msg);
        });

        // Обработчик команды "/subscribe [token]"
        this.bot.onText(/\/subscribe (.+)/, (msg: any, match: any) => {
            const token = match[1]; // Получаем токен из команды
            console.log(`"${token}" = TGBOT`);
            this.authenticateUser(msg, token);
        });

        // Обработчик команды "/unsubscribe"
        this.bot.onText(/\/unsubscribe/, (msg: any) => {
            this.unsubscribeUser(msg);
        });
    }

    // Обработка команды /status
    private async handleStatusCommand(msg: any): Promise<void> {
        const isAuthenticated = await this.telegramUsersService.checkAccess(msg.chat.username, process.env.TELEGRAM_BOT_COMMANDS_ACCESS);
        this.bot.sendMessage(msg.chat.id, isAuthenticated.message);
    }

    // Аутентификация пользователя по токену
    private async authenticateUser(msg: any, token: string): Promise<void> {
        try {
            const result = await this.telegramUsersService.auth(msg.chat.username, msg.chat.id, token);
            this.bot.sendMessage(msg.chat.id, result.message);
        } catch (error) {
            this.logger.error('Ошибка аутентификации:', error);
            this.bot.sendMessage(msg.chat.id, 'Произошла ошибка при аутентификации. Попробуйте снова.');
        }
    }

    // Отписка от рассылки
    private async unsubscribeUser(msg: any): Promise<void> {
        try {
            const result = await this.telegramUsersService.unsubscribe(msg.chat.id);
            if (result) {
                this.bot.sendMessage(msg.chat.id, 'Вы успешно отписались от рассылки.');
            } else {
                this.bot.sendMessage(msg.chat.id, 'Вы не были подписаны на рассылку.');
            }
        } catch (error) {
            this.logger.error('Ошибка отписки:', error);
            this.bot.sendMessage(msg.chat.id, 'Произошла ошибка при отписке. Попробуйте снова.');
        }
    }

    // Отправка сообщений всем подписанным пользователям
    async sendMessage(messageText: string): Promise<void> {
        const result = await this.telegramUsersService.getUsers(process.env.TELEGRAM_BOT_COMMANDS_ACCESS);
        result.users.forEach(user => {
            this.bot.sendMessage(user.chat_id, messageText)
                .then(() => this.logger.debug('Message sent successfully'))
                .catch(err => this.logger.error('Error sending message:', err));
        });
    }

    // Отправка сообщений о новых заказах
    async sendOrderCallMessage(dto: OrderCallDto): Promise<void> {
        const result = await this.telegramUsersService.getUsers(process.env.TELEGRAM_BOT_COMMANDS_ACCESS);
        result.users.forEach(user => {
            this.bot.sendMessage(user.chat_id, 
                `ЗАКАЗ ЗВОНКА\n\nЗАКАЗЧИК\nИмя заказчика: ${dto.name}\nТелефон заказчика: ${dto.phone}`
            );
        });
    }
}
