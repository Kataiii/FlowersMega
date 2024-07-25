import { Controller, Get } from '@nestjs/common';
import { TgBotService } from './tg-bot.service';

@Controller('tg-bot')
export class TgBotController {
    constructor(private tgBotService: TgBotService){}

    @Get('/test')
    async test(){
        this.tgBotService.sendMessage("Добрый день, тест tg-bota");
    }
}
