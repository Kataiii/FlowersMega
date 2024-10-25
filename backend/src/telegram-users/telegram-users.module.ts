import { Module } from '@nestjs/common';
import { TelegramUsersService } from './telegram-users.service';
import { TelegramUsersController } from './telegram-users.controller';
import { TelegramUser } from './telegram-users.model';
import { SequelizeModule } from '@nestjs/sequelize';

@Module({
  providers: [TelegramUsersService],
  controllers: [TelegramUsersController],
  exports: [TelegramUsersService],
  imports: [
    SequelizeModule.forFeature([TelegramUser]),
  ]
})
export class TelegramUsersModule {}
