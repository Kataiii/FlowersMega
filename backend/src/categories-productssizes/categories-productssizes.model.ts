import { Model, Table, Column, DataType, ForeignKey, BelongsTo } from "sequelize-typescript";
import { Category } from "src/categories/categories.model";
import { ProductSize } from "src/products-sizes/products-sizes.model";

interface CategoriesProductsSizesCreationAttrs{
    idProductSize: number;
    idCategory: number;
}

@Table({tableName: 'categories_productssizes', createdAt: false, updatedAt: false})
export class CategoriesProductsSizes extends Model<CategoriesProductsSizes, CategoriesProductsSizesCreationAttrs>{
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @ForeignKey(() => ProductSize)
    @Column({type: DataType.INTEGER, unique: false, allowNull: false})
    idProductSize: number;

    @ForeignKey(() => Category)
    @Column({type: DataType.INTEGER, unique: false, allowNull: false})
    idCategory: number;

    @BelongsTo(() => ProductSize)
    productSize: ProductSize;
}