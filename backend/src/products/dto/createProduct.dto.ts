import { ApiProperty } from "@nestjs/swagger";

export class CreateProductDto{
    @ApiProperty({example: 'Роза', description: 'Name product', required: true})
    name: string;

    @ApiProperty({example: 'Описание про продукт...', description: 'Description product', required: true})
    description: string;

    @ApiProperty({description: 'Images files for product', required: true, format: 'file', isArray: true})
    images: File[];

    @ApiProperty({example: 1, description: 'Unique identifier type product', required: true})
    idTypeProduct: number;
}