import { ApiProperty } from "@nestjs/swagger";

export class DeleteFilterDto{
    @ApiProperty({example: 1, description: 'Id filter', required: true})
    readonly id : number;
}