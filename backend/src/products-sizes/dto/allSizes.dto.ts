import { ApiProperty } from "@nestjs/swagger";
import { Size } from "src/sizes/sizes.model";
import { ProductSize } from "../products-sizes.model";

export class AllSizesDto{
    @ApiProperty({type: [ProductSize], description: 'All products sizes with product id', required: true})
    productsSizes: ProductSize[];

    @ApiProperty({type: [Size], description: 'All sizes with product id', required: true})
    sizes: Size[];
}