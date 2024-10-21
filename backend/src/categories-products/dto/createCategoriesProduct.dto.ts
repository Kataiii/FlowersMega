import { ApiProperty } from "@nestjs/swagger";

export class CreateCategoriesProductDto{
    @ApiProperty({example: 1, description: 'Product id', required: true})
    idProduct: number;

    @ApiProperty({example: 1, description: 'Category id', required: true})
    idCategory: number;
}