import { ApiProperty } from "@nestjs/swagger";
import { Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { Product } from "src/products/products.model";

interface ImageCreationAttrs{
    url: string;
    idProduct: number;
}

@Table({tableName: 'images', createdAt: false, updatedAt: false})
export class Image extends Model<Image, ImageCreationAttrs>{
    @ApiProperty({example: 1, description: 'Unique identifier', required: false})
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @ApiProperty({example: 'image.png', description: 'Url to image', required: true})
    @Column({type: DataType.STRING, allowNull: false})
    url: string;

    @ForeignKey(() => Product)
    @ApiProperty({example: 1, description: 'Unique identifier product', required: false})
    @Column({type: DataType.INTEGER, allowNull: false})
    idProduct: number;
}