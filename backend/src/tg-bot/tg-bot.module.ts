import { Module } from '@nestjs/common';
import { TgBotController } from './tg-bot.controller';
import { TgBotService } from './tg-bot.service';

@Module({
    providers: [TgBotService],
    controllers: [TgBotController],
    exports: [
        TgBotService
    ]
})
export class TgBotModule {}
