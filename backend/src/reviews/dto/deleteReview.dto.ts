import { ApiProperty } from "@nestjs/swagger";

export class DeleteReviewDto{
    @ApiProperty({example: 5, description: 'Id review', required: true})
    id: number;
}