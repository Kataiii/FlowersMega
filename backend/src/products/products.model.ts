import { ApiProperty } from "@nestjs/swagger";
import { BelongsToMany, Column, DataType, ForeignKey, HasMany, Model, Table,  } from "sequelize-typescript";
import { CategoriesProducts } from "src/categories-products/categories_products.model";
import { Category } from "src/categories/categories.model";
import { Image } from "src/images/images.model";
import { ItemFilter } from "src/items-filter/items-filter.model";
import { ProductsItemsFilter } from "src/products-items-filter/products-items-filter.model";
import { TypeProduct } from "src/types-product/types-product.model";

interface ProductCreationAttrs{
    name: string;
    description: string;
    idTypeProduct: number;
}

@Table({tableName: 'products', createdAt: true, updatedAt: true})
export class Product extends Model<Product, ProductCreationAttrs>{
    @ApiProperty({example: 1, description: 'Unique identifier', required: false})
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @ApiProperty({example: 'Роза', description: 'Name product', required: true})
    @Column({type: DataType.STRING, allowNull: false})
    name: string;

    @ApiProperty({example: 'Описание про продукт...', description: 'Description product', required: false})
    @Column({type: DataType.TEXT, allowNull: true})
    description?: string;

    @HasMany(() => Image, "idProduct")
    images: Image[];

    @ApiProperty({example: 1, description: 'Unique identifier type product', required: true})
    @Column({type: DataType.INTEGER, unique: false, allowNull: false})
    @ForeignKey(() => TypeProduct)
    idTypeProduct: number;

    @BelongsToMany(() => ItemFilter, () => ProductsItemsFilter)
    filters: ItemFilter[];

    @BelongsToMany(() => Category, () => CategoriesProducts)
    categories: Category[];
}