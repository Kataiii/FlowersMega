import { Injectable, Logger } from "@nestjs/common";
import { TelegramService } from "nestjs-telegram";
const TelegramBot = require('node-telegram-bot-api');


@Injectable()
export class TgBotService {
    private readonly bot: any;
    private chatId: number = 1034101791;
    private logger = new Logger(TgBotService.name)

    constructor() {
        this.bot = new TelegramBot(process.env.TOKEN_BOT, { polling: true });

        this.bot.on("message", this.onReceiveMesssage)
    }

    onReceiveMesssage = (msg: any) => {
        this.logger.debug(msg);
        this.chatId = msg.chat.id;
    }

    sendMessage = (messageText: string): void => {
        this.bot.sendMessage(this.chatId, messageText)
            .then(() => console.log('Message sent successfully'))
            .catch(err => console.error('Error sending message:', err));
    }
}