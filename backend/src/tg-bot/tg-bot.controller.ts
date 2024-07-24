import { Controller, Get } from '@nestjs/common';
import { TgBotUpdate } from './tg-bot.update';

@Controller('tg-bot')
export class TgBotController {
    constructor(private tgBotUpdate: TgBotUpdate){}

    @Get('/test')
    async test(){
    }
}
