import { ApiProperty } from "@nestjs/swagger";

export class AuthDto{
    @ApiProperty({example: 'email@mail.ru', description: 'Email', required: true})
    readonly email : string;

    @ApiProperty({example: '123456', description: "Password", required: true})
    readonly password: string;

    @ApiProperty({example: true, description: "Save the user for the next login"})
    readonly rememberMe: boolean;
}