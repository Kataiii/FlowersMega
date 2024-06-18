import { ApiProperty } from "@nestjs/swagger";

export class RecoveryDto{
    @ApiProperty({example: 'email@mail.ru', description: 'Email', required: true})
    readonly email : string;
}