import { ApiProperty } from "@nestjs/swagger";
import { Column, DataType, Model, Table } from "sequelize-typescript";

interface TypeProductCreationAttrs{
    name: string;
}

@Table({tableName: 'types_product', createdAt: false, updatedAt: false})
export class TypeProduct extends Model<TypeProduct, TypeProductCreationAttrs>{
    @ApiProperty({example: 1, description: 'Unique identifier', required: false})
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @ApiProperty({example: 'Розы', description: 'Name', required: true})
    @Column({type: DataType.STRING, allowNull: false})
    name: string;
}