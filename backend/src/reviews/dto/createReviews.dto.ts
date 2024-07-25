import { ApiProperty } from "@nestjs/swagger";

export class CreateReviewDto{
    @ApiProperty({example: 5, description: 'Rating of product', required: true})
    rating: number;

    @ApiProperty({example: "Comment of product", description: 'Comment of product', required: false})
    comment?: string;

    @ApiProperty({example: 1, description: 'Unique identifier user', required: false})
    idUser?: number;

    @ApiProperty({example: "Елена", description: 'Name user', required: false})
    firstname: string;

    @ApiProperty({example: "7XXXXXXXXXX", description: 'Phone user', required: false})
    phone: string;

    @ApiProperty({example: 1, description: 'Unique identifier product size', required: true})
    idProductSize: number;
}