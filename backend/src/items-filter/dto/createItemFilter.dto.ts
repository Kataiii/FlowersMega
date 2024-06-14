import { ApiProperty } from "@nestjs/swagger";

export class CreateItemFilterDto{
    @ApiProperty({example: 'Маленький', description: 'Name filter', required: true})
    readonly name : string;

    @ApiProperty({example: 1, description: 'Unique identifie filter', required: false})
    readonly idFilter: number;
}