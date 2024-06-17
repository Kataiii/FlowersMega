import { ApiProperty } from "@nestjs/swagger";
import { Product } from "src/products/products.model";

export class CreateProductSizeDto{
    @ApiProperty({example: 1, description: 'Unique identifier product', required: true})
    idProduct: number;

    @ApiProperty({example: 1, description: 'Unique identifier size', required: true})
    idSize: number;

    @ApiProperty({example: '40 см x 30 см', description: 'Params for size', required: true})
    paramsSize: string;

    @ApiProperty({example: 100, description: 'Count of product', required: false})
    count?: number;

    @ApiProperty({example: 100.00, description: 'Prise of product', required: true})
    prise: number;
}

//TODO доделать
export class CreateProductSizeInfoDto{
    product: Product;

}