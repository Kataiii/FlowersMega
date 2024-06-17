import { ApiProperty } from "@nestjs/swagger";
import { Column, DataType, Model, Table } from "sequelize-typescript";

interface SizeCreationAttrs{
    name: string;
}

@Table({tableName: 'sizes', createdAt: false, updatedAt: false})
export class Size extends Model<Size, SizeCreationAttrs>{
    @ApiProperty({example: 1, description: 'Unique identifier', required: false})
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @ApiProperty({example: 'Большой', description: 'Name', required: true})
    @Column({type: DataType.STRING, allowNull: false})
    name: string;
}