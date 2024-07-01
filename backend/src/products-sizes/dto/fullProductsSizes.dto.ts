import { ApiProperty } from "@nestjs/swagger";
import { ProductCardInfoDto } from "src/products/dto/productCardInfo.dto";
import { StaticticReviews } from "src/reviews/dto/statisticByProductSizeId.dto";
import { Size } from "src/sizes/sizes.model";
import { ProductSize } from "../products-sizes.model";

export class FullProductSizeDto{
    @ApiProperty({type: ProductSize, description: 'Product size', required: true})
    productSize: ProductSize;

    @ApiProperty({type: Size, description: 'Size', required: true})
    size: Size;

    @ApiProperty({type: ProductCardInfoDto, description: 'Product info for card', required: true})
    product: ProductCardInfoDto;

    @ApiProperty({type: StaticticReviews, description: 'Statistics reviews', required: false})
    reviewsInfo: StaticticReviews;
}