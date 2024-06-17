import { ApiProperty } from "@nestjs/swagger";
import { Column, DataType, ForeignKey, Model, Table,  } from "sequelize-typescript";
import { Product } from "src/products/products.model";
import { Size } from "src/sizes/sizes.model";

interface ProductSizeCreationAttrs{
    idProduct: number;
    idSize: number;
    paramsSize: string;
    count?:number;
    prise: number;
}

@Table({tableName: 'products_sizes', createdAt: true, updatedAt: true})
export class ProductSize extends Model<ProductSize, ProductSizeCreationAttrs>{
    @ApiProperty({example: 1, description: 'Unique identifier', required: false})
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @ApiProperty({example: 1, description: 'Unique identifier product', required: true})
    @Column({type: DataType.INTEGER, unique: false, allowNull: false})
    @ForeignKey(() => Product)
    idProduct: number;

    @ApiProperty({example: 1, description: 'Unique identifier size', required: true})
    @Column({type: DataType.INTEGER, unique: false, allowNull: false})
    @ForeignKey(() => Size)
    idSize: number;

    @ApiProperty({example: '40 см x 30 см', description: 'Params for size', required: true})
    @Column({type: DataType.STRING, allowNull: false})
    paramsSize: string;

    @ApiProperty({example: 100, description: 'Count of product', required: false})
    @Column({type: DataType.INTEGER, unique: false, allowNull: true})
    count?: number;

    @ApiProperty({example: 100.00, description: 'Prise of product', required: true})
    @Column({type: DataType.DOUBLE, unique: false, allowNull: false})
    prise: number;
}