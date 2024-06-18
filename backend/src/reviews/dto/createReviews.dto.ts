import { ApiProperty } from "@nestjs/swagger";

export class CreateReviewDto{
    @ApiProperty({example: 5, description: 'Rating of product', required: true})
    rating: number;

    @ApiProperty({example: "Comment of product", description: 'Comment of product', required: false})
    comment?: string;

    @ApiProperty({example: 1, description: 'Unique identifier user', required: false})
    idUser?: number;

    @ApiProperty({example: 1, description: 'Unique identifier product size', required: true})
    idProductSize: number;

    @ApiProperty({description: 'Images files for reviews', required: false, format: 'file', isArray: true})
    images?: File[];
}