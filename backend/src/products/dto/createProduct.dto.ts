import { ApiProperty } from "@nestjs/swagger";

export class CreateProductDto {
    @ApiProperty({ example: 'Роза', description: 'Name product', required: true })
    name: string;

    @ApiProperty({ example: 'Описание про продукт...', description: 'Description product', required: true })
    description: string;

    @ApiProperty({ example: 'Розы аваланж', description: 'Structure product', required: true })
    structure: string;

    @ApiProperty({ example: 1, description: 'Unique identifier type product', required: true })
    idTypeProduct: number;
}

export class UpdateProductDto {
    @ApiProperty({ example: 1, description: 'Id product', required: true })
    id: number;

    @ApiProperty({ example: 'Роза', description: 'Name product', required: true })
    name?: string;

    @ApiProperty({ example: 'Описание про продукт...', description: 'Description product', required: true })
    description?: string;

    @ApiProperty({ example: 'Розы аваланж', description: 'Structure product', required: true })
    structure?: string;

    @ApiProperty({ example: 1, description: 'Unique identifier type product', required: true })
    idTypeProduct?: number;
}