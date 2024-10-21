import { ApiProperty } from "@nestjs/swagger";

export class DeleteSizeDto{
    @ApiProperty({example: 1, description: 'Id size', required: true})
    readonly id : number;
}