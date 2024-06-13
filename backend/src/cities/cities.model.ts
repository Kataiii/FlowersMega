import { ApiProperty } from "@nestjs/swagger";
import { Column, DataType, Model, Table } from "sequelize-typescript";

interface CityCreationAttrs{
    name: string;
}

@Table({tableName: 'cities', createdAt: false, updatedAt: false})
export class City extends Model<City, CityCreationAttrs>{
    @ApiProperty({example: 1, description: 'Unique identifier', required: false})
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @ApiProperty({example: 'Саратов', description: 'Name', required: true})
    @Column({type: DataType.STRING, allowNull: false})
    name: string;
}