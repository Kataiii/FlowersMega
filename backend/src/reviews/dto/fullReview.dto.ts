import { ApiProperty } from "@nestjs/swagger";
import { Product } from "src/products/products.model";
import { ImageReview } from "../../images-reviews/images-reviews.model";

export class FullReviewDto{
    @ApiProperty({example: 1, description: 'Unique identifier', required: true})
    id: number;

    @ApiProperty({example: 5, description: 'Rating of product', required: true})
    rating: number;

    @ApiProperty({example: "Comment of product", description: 'Comment of product', required: false})
    comment?: string;

    @ApiProperty({example: 1, description: 'Unique identifier user', required: false})
    idUser?: number;

    @ApiProperty({example: "Елена", description: 'Name user', required: false})
    firstname: string;

    @ApiProperty({example: 1, description: 'Unique identifier product size', required: true})
    idProductSize: number;

    @ApiProperty({example: "2024-06-25T11:29:59.298Z", description: 'Create date', required: true})
    createdAt: Date;

    @ApiProperty({example: "2024-06-25T11:29:59.298Z", description: 'Update date', required: true})
    updatedAt: Date;

    @ApiProperty({type: [ImageReview], description: 'Update date', required: true})
    images: ImageReview[];

    @ApiProperty({type: Product, description: 'Product', required: true})
    product: Product;
}