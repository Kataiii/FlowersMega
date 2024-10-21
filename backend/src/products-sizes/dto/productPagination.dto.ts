import { ApiProperty } from "@nestjs/swagger";
import { Product } from "src/products/products.model";
import { Size } from "src/sizes/sizes.model";
import { ProductSize } from "../products-sizes.model";

export class ProductSizesWithSizes{
    @ApiProperty({type: [ProductSize], description: 'Products with pagination', required: true})
    productSize: ProductSize;

    @ApiProperty({type: [Size], description: 'Products with pagination', required: true})
    size: Size;
}

export class ProductSizesTmp {
    @ApiProperty({type: [Product], description: 'Products with pagination', required: true})
    products: Product;

    @ApiProperty({type: [ProductSizesWithSizes], description: 'Products with pagination', required: true})
    productsSizes: ProductSizesWithSizes[];
}

export class GetPaginationProductSizeDto{
    @ApiProperty({example: 100, description: 'Count all products', required: true})
    readonly count : number;

    @ApiProperty({type: [ProductSizesTmp], description: 'Products with pagination', required: true})
    readonly products: ProductSizesTmp[];
}