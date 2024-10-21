import { ApiProperty } from "@nestjs/swagger";
import { Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { CategoriesProducts } from "src/categories-products/categories_products.model";


interface ExtraPriceAttrs {
    idCategory: string;
    value: number;
}

@Table({ tableName: 'extra_price', createdAt: true, updatedAt: true })
export class ExtraPrice extends Model<ExtraPrice, ExtraPriceAttrs> {

    @ApiProperty({ example: 1, description: 'Category', required: true })
    @Column({ type: DataType.STRING, allowNull: false })
    @ForeignKey(() => CategoriesProducts)
    idCategory: string;

    @ApiProperty({ example: 1, description: 'Value', required: true })
    @Column({ type: DataType.INTEGER, allowNull: false })
    value: number;


}