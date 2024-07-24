import { InjectBot, Start, Update, Command } from "nestjs-telegraf";
import { Telegraf, Context } from "telegraf";

let chatId: number;
let context: Context;

@Update()
export class TgBotUpdate{
    constructor(@InjectBot() private readonly bot: Telegraf<Context>){}

    @Start()
    async startBot(context: Context){
        chatId = context.chat.id;
        context = context;
        await context.reply('Бот Flowers Mega запущен');
    }

    async sendMessage(context: Context){
        await context.sendMessage('Привет');
    }
}