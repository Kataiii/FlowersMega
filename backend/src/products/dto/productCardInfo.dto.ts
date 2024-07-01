import { ApiProperty } from "@nestjs/swagger";
import { Category } from "src/categories/categories.model";
import { Image } from "src/images/images.model";
import { ItemFilter } from "src/items-filter/items-filter.model";

export class ProductCardInfoDto{
    @ApiProperty({example: 'Роза', description: 'Name product', required: true})
    name: string;

    @ApiProperty({example: 1, description: 'Unique identifier type product', required: true})
    idTypeProduct: number;

    @ApiProperty({type: Image, description: 'Image preview product', required: true})
    image: Image;

    @ApiProperty({type: [ItemFilter], description: 'Array of tags filters', required: true})
    filters: ItemFilter[];

    @ApiProperty({type: [Category], description: 'Array of categories', required: true})
    categories: Category[];
}