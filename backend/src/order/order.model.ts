import { ApiProperty } from "@nestjs/swagger";
import { BelongsToMany, Column, DataType, ForeignKey, Model, Table, } from "sequelize-typescript";
import { City } from "src/cities/cities.model";
import { OrderProductSize } from "src/orders-products-sizes/orders-products-sizes.model";
import { ProductSize } from "src/products-sizes/products-sizes.model";
import { User } from "src/users/users.model";

interface OrderCreationAttrs {
    name: string;
    dateOrder: Date;
    dateDelivery: Date;
    cost: number;
    idUser?: number;
    nameCustomer: string;
    emailCustomer: string;
    phoneCustomer: string;
    nameRecipient: string;
    phoneRecipient: string;
    canCall: boolean;
    idCity: number;
    addressDelivery: string;
    startTimeDelivery: string;
    endTimeDelivery: string;
    comment?: string;
    postcards?: { id: string; text: string; updatedId: string }[];
}

@Table({ tableName: 'orders', createdAt: true, updatedAt: true })
export class Order extends Model<Order, OrderCreationAttrs> {
    @ApiProperty({ example: 1, description: 'Unique identifier', required: false })
    @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
    id: number;

    @ApiProperty({ example: '0000000', description: 'Name order', required: true })
    @Column({ type: DataType.STRING, allowNull: false })
    name: string;

    @ApiProperty({ example: new Date(), description: 'Date order', required: true })
    @Column({ type: DataType.DATE, allowNull: false })
    dateOrder: Date;

    @ApiProperty({ example: new Date(), description: 'Date delivery', required: true })
    @Column({ type: DataType.DATE, allowNull: false })
    dateDelivery: Date;

    @ApiProperty({ example: 1000.00, description: 'Cost order', required: true })
    @Column({ type: DataType.DOUBLE, allowNull: false })
    cost: number;

    @ApiProperty({ example: 1, description: 'Unique identifier user', required: false })
    @Column({ type: DataType.INTEGER, allowNull: true })
    @ForeignKey(() => User)
    idUser?: number;

    @ApiProperty({ example: "Иван", description: 'Name of customer', required: true })
    @Column({ type: DataType.STRING, allowNull: false })
    nameCustomer: string;

    @ApiProperty({ example: "email@mail.ru", description: 'Email of customer', required: true })
    @Column({ type: DataType.STRING, allowNull: false })
    emailCustomer: string;

    @ApiProperty({ example: "+7XXXXXXXXXX", description: 'Phone of customer', required: true })
    @Column({ type: DataType.STRING, allowNull: false })
    phoneCustomer: string;

    @ApiProperty({ example: "Иван", description: 'Name of recipient', required: true })
    @Column({ type: DataType.STRING, allowNull: false })
    nameRecipient: string;

    @ApiProperty({ example: "+7XXXXXXXXXX", description: 'Phone of recipient', required: true })
    @Column({ type: DataType.STRING, allowNull: false })
    phoneRecipient: string;

    @ApiProperty({ example: true, description: 'can call to recipient', required: true })
    @Column({ type: DataType.BOOLEAN, allowNull: false })
    canCall: boolean;

    @ApiProperty({ example: 1, description: 'Unique identifier city', required: false })
    @Column({ type: DataType.INTEGER, allowNull: true })
    @ForeignKey(() => City)
    idCity: number;

    @ApiProperty({ example: "ул. Первая, д. 1, кв. 1", description: 'Address of delivery', required: true })
    @Column({ type: DataType.STRING, allowNull: false })
    addressDelivery: string;

    @ApiProperty({ example: "10:00", description: 'Start time of delivery', required: true })
    @Column({ type: DataType.STRING, allowNull: false })
    startTimeDelivery: string;

    @ApiProperty({ example: "12:00", description: 'End time of delivery', required: true })
    @Column({ type: DataType.STRING, allowNull: false })
    endTimeDelivery: string;

    @ApiProperty({ example: "Comment on the order", description: 'Comment on the order', required: false })
    @Column({ type: DataType.TEXT, allowNull: true })
    comment?: string;

    @ApiProperty({
        example: [
            { postcardId: 1, postcardText: 'Happy Birthday!' },
            { postcardId: 2, postcardText: 'Best wishes!' }
        ],
        description: 'Array of postcards with ID and text',
        required: false
    })
    @Column({ type: DataType.JSONB, allowNull: true })
    postcards?: { id: number; text: string; updatedId: string }[];

    @BelongsToMany(() => ProductSize, () => OrderProductSize)
    itemsOrder: ProductSize[];

}