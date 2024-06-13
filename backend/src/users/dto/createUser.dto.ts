import { ApiProperty } from "@nestjs/swagger";

export class CreateUserDto{
    @ApiProperty({example: 'Иван', description: 'Firstname', required: true})
    readonly firstname : string;

    @ApiProperty({example: '+79999999999', description: 'Phone', required: true})
    readonly phone: string;

    @ApiProperty({example: 'email@mail.ru', description: 'Email', required: true})
    readonly email: string;

    @ApiProperty({example: 'qwerty', description: 'Password', required: true})
    readonly password: string;
}