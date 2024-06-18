import { ApiProperty } from "@nestjs/swagger";

export class RegistDto{
    @ApiProperty({example: "Иван", description: 'Name', required: true})
    readonly name: string;

    @ApiProperty({example: 'email@mail.ru', description: 'Email', required: true})
    readonly email : string;

    @ApiProperty({example: '+7XXXXXXXXXX', description: 'Phone', required: true})
    readonly phone: string;

    @ApiProperty({example: '123456', description: "Password", required: true})
    readonly password: string;

    @ApiProperty({example: '123456', description: 'Repeat password', required: true})
    readonly repeatPassword: string;
}