import { ApiProperty } from "@nestjs/swagger";
import { Category } from "../categories.model";

export class GetPaginationCategoriesDto{
    @ApiProperty({example: 100, description: 'Count all categories', required: true})
    readonly count : number;

    @ApiProperty({type: [Category], description: 'Categories with pagination', required: true})
    readonly categories: Category[];
}