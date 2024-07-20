import { ApiProperty } from "@nestjs/swagger";
import { FullFilterDto } from "./fullFilters";

export class FiltersMaxPriceDto{
    @ApiProperty({example: 10000, description: 'Max price product', required: true})
    readonly maxPrice : string;

    @ApiProperty({type: [FullFilterDto], description: 'filters with items', required: true})
    readonly filters : FullFilterDto[];
}