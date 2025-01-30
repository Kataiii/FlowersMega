import { ApiProperty } from "@nestjs/swagger";
import { BelongsTo, BelongsToMany, Column, DataType, ForeignKey, HasMany, Model, Sequelize, Table, } from "sequelize-typescript";
import { CategoriesProductsSizes } from "src/categories-productssizes/categories-productssizes.model";
import { Category } from "src/categories/categories.model";
import { Order } from "src/order/order.model";
import { OrderProductSize } from "src/orders-products-sizes/orders-products-sizes.model";
import { Product } from "src/products/products.model";
import { Size } from "src/sizes/sizes.model";

export interface ProductSizeCreationAttrs {
    idProduct: number;
    idSize: number;
    paramsSize?: string;
    count?: number;
    prise: number;
    extraPrice: number;
}

@Table({ tableName: 'products_sizes', createdAt: true, updatedAt: true })
export class ProductSize extends Model<ProductSize, ProductSizeCreationAttrs> {
    @ApiProperty({ example: 1, description: 'Unique identifier', required: false })
    @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
    id: number;

    @ApiProperty({ example: 1, description: 'Unique identifier product', required: true })
    @Column({ type: DataType.INTEGER, unique: false, allowNull: false })
    @ForeignKey(() => Product)
    idProduct: number;

    @ApiProperty({ example: 1, description: 'Unique identifier size', required: true })
    @Column({ type: DataType.INTEGER, unique: false, allowNull: false })
    @ForeignKey(() => Size)
    idSize: number;

    @ApiProperty({ example: '40 см x 30 см', description: 'Params for size', required: false })
    @Column({ type: DataType.STRING, allowNull: true })
    paramsSize?: string;

    @ApiProperty({ example: 100, description: 'Count of product', required: false })
    @Column({ type: DataType.INTEGER, unique: false, allowNull: true })
    count?: number;

    @ApiProperty({ example: 100.00, description: 'Prise of product', required: true })
    @Column({ type: DataType.DOUBLE, unique: false, allowNull: false })
    prise: number;

    @ApiProperty({ example: 100.00, description: 'Extra prize of product', required: true })
    @Column({ type: DataType.DOUBLE, unique: false, allowNull: false })
    extraPrice: number;

    @BelongsToMany(() => Order, () => OrderProductSize)
    orders: Order[];

    @BelongsToMany(() => Category, () => CategoriesProductsSizes)
    categories: Category[];

    @HasMany(() => CategoriesProductsSizes)
    categoriesProductsSizes: CategoriesProductsSizes[];

    @BelongsTo(() => Product, 'idProduct')
    product: Product


}