import { ApiProperty } from "@nestjs/swagger";

export class CreateFilterDto{
    @ApiProperty({example: 'Размер', description: 'Name filter', required: true})
    readonly name : string;
}