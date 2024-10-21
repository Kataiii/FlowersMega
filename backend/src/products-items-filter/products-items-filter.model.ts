import { Model, Table, Column, DataType, ForeignKey } from "sequelize-typescript";
import { ItemFilter } from "src/items-filter/items-filter.model";
import { Product } from "src/products/products.model";

interface ProductItemsFilterCreationAttrs{
    idProduct: number;
    idItemFilter: number;
}

@Table({tableName: 'products_items_filter', createdAt: false, updatedAt: false})
export class ProductsItemsFilter extends Model<ProductsItemsFilter, ProductItemsFilterCreationAttrs>{
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @ForeignKey(() => Product)
    @Column({type: DataType.INTEGER, unique: false, allowNull: true})
    idProduct: number;

    @ForeignKey(() => ItemFilter)
    @Column({type: DataType.INTEGER, unique: false, allowNull: true})
    idItemFilter: number;
}