import { Module } from '@nestjs/common';
import { TgBotController } from './tg-bot.controller';
import { TgBotService } from './tg-bot.service';
import { TelegramUsersModule } from 'src/telegram-users/telegram-users.module';

@Module({
    providers: [TgBotService],
    controllers: [TgBotController],
    imports: [TelegramUsersModule],
    exports: [
        TgBotService
    ]
})
export class TgBotModule {}
