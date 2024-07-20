import { ApiProperty } from "@nestjs/swagger";
import { ItemFilter } from "src/items-filter/items-filter.model";

export class FullFilterDto{
    @ApiProperty({example: 1, description: 'Unique identifier', required: true})
    readonly id : number;

    @ApiProperty({example: 'Размер', description: 'Name filter', required: true})
    readonly name : string;

    @ApiProperty({type: [ItemFilter], description: 'items filter', required: true})
    readonly items: ItemFilter[];
}