import { ApiProperty } from "@nestjs/swagger";

export class CreateImageReviewDto{
    @ApiProperty({example: 1, description: 'Unique identifier review', required: true})
    readonly idReview: number;

    @ApiProperty({description: 'Image for product', required: true, format: "file"})
    readonly image: File;
}