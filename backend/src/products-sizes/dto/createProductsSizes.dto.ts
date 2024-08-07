import { ApiProperty } from "@nestjs/swagger";
import { CreateProductDto } from "src/products/dto/createProduct.dto";
import { Product } from "src/products/products.model";
import { CreateSizeDto } from "src/sizes/dto/createSize.dto";
import { Size } from "src/sizes/sizes.model";

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

export class CreateProductSizeInfoDto{
    @ApiProperty({type: CreateProductDto, description: 'Product', required: true})
    product: CreateProductDto;

    @ApiProperty({type: CreateSizeDto, description: 'Size', required: true})
    size: CreateSizeDto;

    @ApiProperty({example: '40 см x 30 см', description: 'Params for size', required: true})
    paramsSize: string;

    @ApiProperty({example: 100, description: 'Count of product', required: false})
    count?: number;

    @ApiProperty({example: 100.00, description: 'Prise of product', required: true})
    prise: number;
}