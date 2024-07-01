import { ApiProperty } from "@nestjs/swagger";

export class StaticticReviews{
    @ApiProperty({example: 100, description: 'Count reviews', required: true})
    readonly count : number;

    @ApiProperty({example: 4.5, description: 'Average rating', required: true})
    readonly averageRating: number;
}