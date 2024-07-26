import { ApiProperty } from "@nestjs/swagger";

export class OrderCallDto{
    @ApiProperty({example: 'Имя', description: 'Name user', required: true})
    readonly name : string;

    @ApiProperty({example: '7XXXXXXXXXX', description: 'Phone user', required: true})
    readonly phone : string;

    @ApiProperty({example: true, description: 'disabled', required: true})
    readonly disabled : boolean;
}