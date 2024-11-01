import { Controller, Get, Param, Post, Body } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { TelegramUsersService } from './telegram-users.service';

@ApiTags("Telegram Users")
@Controller('telegram-users')
export class TelegramUsersController {
    constructor(private telegramUsersService: TelegramUsersService) {}

    @ApiOperation({ summary: 'Authorize in Telegram Bot' })
    @ApiResponse({ status: 200, type: Boolean })
    @ApiResponse({ status: 403, description: "Incorrect access key" })
    @ApiBody({
        schema: {
            type: 'object',
            properties: {
                user_tag: { type: 'string', example: 'some_user_tag' },
                chat_id: { type: 'number', example: '-1234567890' },
                access_key: { type: 'string', example: 'some_access_key' },
            },
            required: ['user_tag', 'chat_id', 'access_key'],
        },
    })
    @Post("/tg-bot/authorize")
    async authorize(
        @Body('user_tag') user_tag: string,
        @Body('chat_id') chat_id: number,
        @Body('access_key') access_key: string
    ) {
        console.log(user_tag, ' ', access_key, ' в контроллере');
        const result = await this.telegramUsersService.auth(user_tag, chat_id, access_key);
        if (result.value) {
            return { statusCode: 200, message: `Аутентификация пройдена для ${user_tag}!` };
        }
        else{
            return { statusCode: 403, message: `Доступ запрещен для ${user_tag}!` };
        }
        return result;
    }

    @ApiOperation({ summary: 'Check if user has access' })
    @ApiResponse({ status: 200, type: Boolean })
    @ApiBody({
        schema: {
            type: 'object',
            properties: {
                chat_id: { type: 'number', example: '-1234567890' },
                access_key: { type: 'string', example: 'some_access_key' },
            },
            required: ['user_tag', 'access_key'],
        },
    })
    @Post("/tg-bot/check-access")
    async checkAccess(
        @Body('chat_id') chat_id: number,
        @Body('access_key') access_key: string
    ) {
        const hasAccess = await this.telegramUsersService.checkAccess(chat_id, access_key);
        return hasAccess;
    }

    @ApiOperation({ summary: 'Get all Telegram users' })
    @ApiResponse({ status: 200, type: Boolean })
    @ApiBody({
        schema: {
            type: 'object',
            properties: {
                access_key: { type: 'string', example: 'some_access_key' },
            },
            required: ['access_key'],
        },
    })
    @Post("/tg-bot/get-users")
    async getUsers(@Body('access_key') access_key: string) {
        const result = await this.telegramUsersService.getUsers(access_key);
        return result;
    }
}
