import { ApiProperty } from "@nestjs/swagger";
import { ProductSize } from "../products-sizes.model";

export class GetPaginationProductSizeDto{
    @ApiProperty({example: 100, description: 'Count all products', required: true})
    readonly count : number;

    @ApiProperty({type: [ProductSize], description: 'Products with pagination', required: true})
    readonly productsSizes: ProductSize[];
}