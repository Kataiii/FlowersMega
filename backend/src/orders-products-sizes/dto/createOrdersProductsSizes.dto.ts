import { ApiProperty } from "@nestjs/swagger";

export class CreateOrderProductSizeDto{
    @ApiProperty({example: 100, description: 'Count of products sizes', required: true})
    readonly count: number;

    @ApiProperty({example: 1, description: 'Unique identifier product size', required: true})
    readonly idProductSize:number;

    @ApiProperty({example: 1, description: 'Unique identifier order', required: true})
    readonly idOrder: number;
}