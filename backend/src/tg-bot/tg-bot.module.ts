import { Module } from '@nestjs/common';
import { TgBotUpdate } from './tg-bot.update';
import { TgBotController } from './tg-bot.controller';

@Module({
    providers: [TgBotUpdate],
    controllers: [TgBotController]
})
export class TgBotModule {}
