import { ApiProperty } from "@nestjs/swagger";
import { Category } from "src/categories/categories.model";
import { Filter } from "src/filters/filters.model";
import { ItemFilter } from "src/items-filter/items-filter.model";

export class CreateProductSizeSmallDto{
    idSize: number;
    prise: number;
    paramsSize: string;
}

export class FilterWithItems{
    filter: Filter;
    tags: ItemFilter[];
}

export class CreateFullProductSizeDto{
    @ApiProperty({example: "Розы красные", description: 'Name product', required: true})
    name: string;

    @ApiProperty({example: 1, description: 'id type product', required: true})
    type: number;

    @ApiProperty({example: "Описание какое-то", description: 'Description product', required: true})
    description: string;

    @ApiProperty({example: "Розы, упаковка", description: "Structure of product", required: true})
    structure: string;
  
    @ApiProperty({type: [CreateProductSizeSmallDto], description: 'Small dto for product size', required: true})
    productSize: CreateProductSizeSmallDto[];
  
    @ApiProperty({type: [Category], description: 'Array categories', required: true})
    categories: [];

    @ApiProperty({type: [FilterWithItems], description: 'Array filters with items', required: true})
    filters: FilterWithItems[];
}