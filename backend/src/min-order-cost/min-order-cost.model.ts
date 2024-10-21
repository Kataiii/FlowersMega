import { ApiProperty } from "@nestjs/swagger";
import { Column, DataType, Model, Table } from "sequelize-typescript";

interface MinOrderCostAttrs {
    value: number;
}

@Table({ tableName: 'min_order_cost' })
export class MinOrderCost extends Model<MinOrderCost, MinOrderCostAttrs> {
    @ApiProperty({ example: 1, description: 'Minimal order cost', required: true })
    @Column({ type: DataType.INTEGER, allowNull: false })
    value: number;
}