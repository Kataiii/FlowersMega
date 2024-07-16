import { ApiProperty } from "@nestjs/swagger";

export class ChangePasswordDto{
    @ApiProperty({example: '123456', description: 'Previous password', required: true})
    readonly prevPassword : string;

    @ApiProperty({example: '123456', description: "Next password", required: true})
    readonly nextPassword: string;

    @ApiProperty({example: '123456', description: "Repeat next password", required: true})
    readonly repeatNextPassword: string;
}