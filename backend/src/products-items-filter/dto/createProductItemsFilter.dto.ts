import { ApiProperty } from "@nestjs/swagger";

export class CreateProductItemsFilterDto{
    @ApiProperty({example: 1, description: 'Product id', required: true})
    idProduct: number;

    @ApiProperty({example: 1, description: 'Item filter id', required: true})
    idItemFilter: number;
}