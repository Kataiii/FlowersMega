import { ApiProperty } from "@nestjs/swagger";

export class CreateCategoryDto{
    @ApiProperty({example: 'Размер', description: 'Name category', required: true})
    readonly name : string;
}