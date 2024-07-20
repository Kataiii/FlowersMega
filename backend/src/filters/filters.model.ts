import { ApiProperty } from "@nestjs/swagger";
import { Column, DataType, HasMany, Model, Table } from "sequelize-typescript";
import { ItemFilter } from "src/items-filter/items-filter.model";

interface FilterCreationAttrs{
    name: string;
}

@Table({tableName: 'filters', createdAt: false, updatedAt: false})
export class Filter extends Model<Filter, FilterCreationAttrs>{
    @ApiProperty({example: 1, description: 'Unique identifier', required: false})
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @ApiProperty({example: 'Размер', description: 'Name', required: true})
    @Column({type: DataType.STRING, allowNull: false})
    name: string;

    @HasMany(() => ItemFilter)
    items: ItemFilter[];
}