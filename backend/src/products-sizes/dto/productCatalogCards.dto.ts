import { ApiProperty } from "@nestjs/swagger";
import { Category } from "src/categories/categories.model";
import { ItemFilter } from "src/items-filter/items-filter.model";
import { Image } from "src/images/images.model";
import { ProductSize } from "../products-sizes.model";
import { Size } from "src/sizes/sizes.model";

export class ProductSizeDto {
    @ApiProperty({ example: 1, description: 'Unique identifier for the product size', required: true })
    id: number;

    @ApiProperty({ example: 1, description: 'Unique identifier for the product', required: true })
    idProduct: number;

    @ApiProperty({ example: 1, description: 'Unique identifier for the size', required: true })
    idSize: number;

    @ApiProperty({ example: 'Размер 1', description: 'Parameters of the size', required: true })
    paramsSize: string;

    @ApiProperty({ example: 10, description: 'Available count for this size', required: true })
    count: number;

    @ApiProperty({ example: 100, description: 'Price of this size', required: true })
    price: number;

    @ApiProperty({ example: [], description: 'List of orders related to this product size', required: false })
    orders: object[];
}

export class ProductCatalogCards {
    @ApiProperty({ example: 'Роза', description: 'Name of the product', required: true })
    name: string;

    @ApiProperty({ example: 'Описание продукта', description: 'Description of the product', required: true })
    description: string;

    @ApiProperty({ example: 'Состав: 100% натуральные материалы', description: 'Structure of the product', required: true })
    structure: string;

    @ApiProperty({ example: 1, description: 'Unique identifier for the type of the product', required: true })
    idTypeProduct: number;

    @ApiProperty({ type: () => Image, description: 'Image preview of the product', required: true })
    image: Image;

    @ApiProperty({ type: () => [ItemFilter], description: 'Array of tags/filters associated with the product', required: true })
    filters: ItemFilter[];

    @ApiProperty({ type: () => [Category], description: 'Array of categories associated with the product', required: true })
    categories: Category[];

    @ApiProperty({ example: 4.5, description: 'Average review rating for the product', required: true })
    reviewInfo: number;

    @ApiProperty({
        type: 'array',
        items: {
            type: 'object',
            properties: {
                productSize: { $ref: '#/components/schemas/ProductSizeDto' },
                size: { $ref: '#/components/schemas/Size' },
            },
        },
        description: 'Array of product sizes and sizes',
        required: true
    })
    productSizes: {
        productSize: ProductSizeDto;
        size: Size;
    }[];
}