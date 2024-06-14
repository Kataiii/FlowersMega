import { ApiProperty } from "@nestjs/swagger";

export class CreateTypeProductDto{
    @ApiProperty({example: 'Корзина', description: 'Name type product', required: true})
    readonly name : string;
}