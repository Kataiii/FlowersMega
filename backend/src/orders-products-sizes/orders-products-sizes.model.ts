import { ApiProperty } from "@nestjs/swagger";
import { Column, DataType, ForeignKey, Model, Table,  } from "sequelize-typescript";
import { Order } from "src/order/order.model";
import { ProductSize } from "src/products-sizes/products-sizes.model";

interface OrderProductSizeCreationAttrs{
    count: number;
    idProductSize:number;
    idOrder: number;
}

@Table({tableName: 'orders_products_sizes', createdAt: true, updatedAt: true})
export class OrderProductSize extends Model<OrderProductSize, OrderProductSizeCreationAttrs>{
    @ApiProperty({example: 1, description: 'Unique identifier', required: false})
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @ApiProperty({example: 100, description: 'Count of products sizes', required: true})
    @Column({type: DataType.INTEGER, allowNull: false})
    count: number;

    @ApiProperty({example: 1, description: 'Unique identifier product size', required: true})
    @Column({type: DataType.INTEGER, allowNull: true})
    @ForeignKey(() => ProductSize)
    idProductSize:number;

    @ApiProperty({example: 1, description: 'Unique identifier order', required: true})
    @Column({type: DataType.INTEGER, allowNull: true})
    @ForeignKey(() => Order)
    idOrder: number;
}