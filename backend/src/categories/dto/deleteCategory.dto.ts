import { ApiProperty } from "@nestjs/swagger";

export class DeleteCategoryDto{
    @ApiProperty({example: 1, description: 'Id category', required: true})
    readonly id : number;
}