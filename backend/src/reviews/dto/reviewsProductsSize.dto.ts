import { ApiProperty } from "@nestjs/swagger";
import { Review } from "../reviews.model";
import { FullReviewDto } from "./fullReview.dto";

export class ReviewsProductSizeDto{
    @ApiProperty({example: 100, description: 'Count reviews', required: true})
    readonly count : number;

    @ApiProperty({example: 4.5, description: 'Average rating', required: true})
    readonly averageRating: number;

    @ApiProperty({type: [Review], description: 'Reviews',required: true})
    readonly reviews: FullReviewDto[];
}