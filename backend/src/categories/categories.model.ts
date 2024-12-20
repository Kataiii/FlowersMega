import { ApiProperty } from "@nestjs/swagger";
import { BelongsToMany, Column, DataType, Model, Table } from "sequelize-typescript";
import { CategoriesProducts } from "src/categories-products/categories_products.model";
import { CategoriesProductsSizes } from "src/categories-productssizes/categories-productssizes.model";
import { ProductSize } from "src/products-sizes/products-sizes.model";
import { Product } from "src/products/products.model";

interface CategoryCreationAttrs{
    name: string;
}

@Table({tableName: 'categories', createdAt: false, updatedAt: false})
export class Category extends Model<Category, CategoryCreationAttrs>{
    @ApiProperty({example: 1, description: 'Unique identifier', required: false})
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @ApiProperty({example: 'Розы', description: 'Name', required: true})
    @Column({type: DataType.STRING, allowNull: false})
    name: string;

    @ApiProperty({example: 'image.png', description: 'url preview', required: false})
    @Column({type: DataType.STRING, allowNull: true})
    url?: string;

    @BelongsToMany(() => Product, () => CategoriesProducts)
    products: Product[];

    @BelongsToMany(() => ProductSize, () => CategoriesProductsSizes)
    productsSizes: ProductSize[];
}