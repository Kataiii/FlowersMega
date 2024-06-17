import { Model, Table, Column, DataType, ForeignKey } from "sequelize-typescript";
import { Category } from "src/categories/categories.model";
import { Product } from "src/products/products.model";


@Table({tableName: 'categories_products', createdAt: false, updatedAt: false})
export class CategoriesProducts extends Model<CategoriesProducts>{
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @ForeignKey(() => Product)
    @Column({type: DataType.INTEGER, unique: false, allowNull: false})
    idProduct: number;

    @ForeignKey(() => Category)
    @Column({type: DataType.INTEGER, unique: false, allowNull: false})
    idCategory: number;
}