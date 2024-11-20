import { ApiProperty } from "@nestjs/swagger";

export class CreateCategoriesProductSizeDto{
    @ApiProperty({example: 1, description: 'Product size id', required: true})
    idProductSize: number;

    @ApiProperty({example: 1, description: 'Category id', required: true})
    idCategory: number;
}