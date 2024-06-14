import { ApiProperty } from "@nestjs/swagger";
import { Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { Filter } from "src/filters/filters.model";

interface ItemFilterCreationAttrs{
    name: string;
    idFilter: number;
}

@Table({tableName: 'items_filter', createdAt: false, updatedAt: false})
export class ItemFilter extends Model<ItemFilter, ItemFilterCreationAttrs>{
    @ApiProperty({example: 1, description: 'Unique identifier', required: false})
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @ApiProperty({example: 'Маленький', description: 'Name', required: true})
    @Column({type: DataType.STRING, allowNull: false})
    name: string;

    @ForeignKey(() => Filter)
    @ApiProperty({example: 1, description: 'Unique identifie filter', required: false})
    @Column({type: DataType.INTEGER, allowNull: true})
    idFilter: number;
}