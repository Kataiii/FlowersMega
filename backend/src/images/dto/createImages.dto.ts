import { ApiProperty } from "@nestjs/swagger";

export class CreateImageDto{
    @ApiProperty({example: 1, description: 'Unique identifier product', required: true})
    readonly idProduct: number;

    @ApiProperty({description: 'Image for product', required: true, format: "file"})
    readonly image: File;
}

export class UpdateImageDto{
    @ApiProperty({example: 1, description: 'Unique identifier product', required: true})
    readonly idProduct?: number;

    @ApiProperty({description: 'Image for product', required: true, format: "file"})
    readonly images?: File[];
}