import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { OrderCallDto } from './dto/orderCall.dto';
import { TgBotService } from './tg-bot.service';

@ApiTags("Tg-bot")
@Controller('tg-bot')
export class TgBotController {
    constructor(private tgBotService: TgBotService){}

    @ApiOperation({summary: 'Get order call'})
    @ApiResponse({status: 200})
    @Post("/order-call")
    async getOrderCall(@Body() dto: OrderCallDto){
        this.tgBotService.sendOrderCallMessage(dto);
    }
}
