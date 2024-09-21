import { ApiProperty } from "@nestjs/swagger";

export class DeleteItemFilterDto{
    @ApiProperty({example: 1, description: 'Unique identifie item filter', required: false})
    readonly id: number;
}