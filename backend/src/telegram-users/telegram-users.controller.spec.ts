import { Test, TestingModule } from '@nestjs/testing';
import { TelegramUsersController } from './telegram-users.controller';

describe('TelegramUsersController', () => {
  let controller: TelegramUsersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TelegramUsersController],
    }).compile();

    controller = module.get<TelegramUsersController>(TelegramUsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
