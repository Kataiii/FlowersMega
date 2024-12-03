import { ApiProperty } from "@nestjs/swagger";
import { ProductSize } from "src/products-sizes/products-sizes.model";

export class CreateItemOrderDto {
    @ApiProperty({ type: ProductSize, description: 'Item order' })
    product: ProductSize;

    @ApiProperty({ example: 1, description: 'Count of products', required: false })
    count: number;
}

export class CreateOrderDto {
    @ApiProperty({ example: '0000000', description: 'Name order', required: true })
    name: string;

    @ApiProperty({ example: new Date(), description: 'Date order', required: true })
    dateOrder: string;

    @ApiProperty({ example: new Date(), description: 'Date delivery', required: true })
    dateDelivery: string;

    @ApiProperty({ example: 1000.00, description: 'Cost order', required: true })
    cost: number;

    @ApiProperty({ example: 1, description: 'Unique identifier user', required: false })
    idUser?: number;

    @ApiProperty({ example: "Иван", description: 'Name of customer', required: true })
    nameCustomer: string;

    @ApiProperty({ example: "email@mail.ru", description: 'Email of customer', required: true })
    emailCustomer: string;

    @ApiProperty({ example: "+7XXXXXXXXXX", description: 'Phone of customer', required: true })
    phoneCustomer: string;

    @ApiProperty({ example: "Иван", description: 'Name of recipient', required: true })
    nameRecipient: string;

    @ApiProperty({ example: "+7XXXXXXXXXX", description: 'Phone of recipient', required: true })
    phoneRecipient: string;

    @ApiProperty({ example: true, description: 'can call to recipient', required: true })
    canCall: boolean;

    @ApiProperty({ example: 1, description: 'Unique identifier city', required: false })
    idCity: number;

    @ApiProperty({ example: "ул. Первая, д. 1, кв. 1", description: 'Address of delivery', required: true })
    addressDelivery: string;

    @ApiProperty({ example: "10:00", description: 'Start time of delivery', required: true })
    startTimeDelivery: string;

    @ApiProperty({ example: "12:00", description: 'End time of delivery', required: true })
    endTimeDelivery: string;

    @ApiProperty({ example: "Comment on the order", description: 'Comment on the order', required: false })
    comment?: string;

    @ApiProperty({
        example: [
            { postcardId: 1, postcardText: 'Happy Birthday!' },
            { postcardId: 2, postcardText: 'Best wishes!' }
        ],
        description: 'Array of postcards with ID and text',
        required: false
    })
    postcards?: { id: string; text: string; updatedId: string }[];

    @ApiProperty({ type: [CreateItemOrderDto], description: 'Items order' })
    itemsOrder?: CreateItemOrderDto[];
}