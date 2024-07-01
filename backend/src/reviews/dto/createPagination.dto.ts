import { ApiProperty } from "@nestjs/swagger";
import { FullReviewDto } from "./fullReview.dto";

export class GetPaginationFullReviewDto{
    @ApiProperty({example: 100, description: 'Count all reviews', required: true})
    readonly count : number;

    @ApiProperty({type: [FullReviewDto], description: 'Reviews with pagination', required: true})
    readonly reviews: FullReviewDto[];
}