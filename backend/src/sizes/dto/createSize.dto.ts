import { ApiProperty } from "@nestjs/swagger";

export class CreateSizeDto{
    @ApiProperty({example: 'Размер', description: 'Name size', required: true})
    readonly name : string;
}