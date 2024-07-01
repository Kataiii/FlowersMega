import { ApiProperty } from "@nestjs/swagger";
import { Column, DataType, ForeignKey, HasMany, HasOne, Model, Table } from "sequelize-typescript";
import { ImageReview } from "src/images-reviews/images-reviews.model";
import { ProductSize } from "src/products-sizes/products-sizes.model";
import { User } from "src/users/users.model";

interface ReviewCreationAttrs{
    rating: number;
    comment?: string;
    idUser?: number;
    idProductSize: number;
    firstname: string;
}

@Table({tableName: 'reviews', createdAt: true, updatedAt: true})
export class Review extends Model<Review, ReviewCreationAttrs>{
    @ApiProperty({example: 1, description: 'Unique identifier', required: false})
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @ApiProperty({example: 5, description: 'Rating of product', required: true})
    @Column({type: DataType.INTEGER, allowNull: false})
    rating: number;

    @ApiProperty({example: "Comment of product", description: 'Comment of product', required: false})
    @Column({type: DataType.TEXT, allowNull: true})
    comment?: string;

    @ApiProperty({example: 1, description: 'Unique identifier user', required: false})
    @Column({type: DataType.INTEGER, allowNull: true})
    @ForeignKey(() => User)
    idUser?: number;

    @ApiProperty({example: "Елена", description: 'Name user', required: false})
    @Column({type: DataType.STRING, allowNull: false})
    firstname: string;

    @ApiProperty({example: 1, description: 'Unique identifier product size', required: true})
    @Column({type: DataType.INTEGER, allowNull: false})
    @ForeignKey(() => ProductSize)
    idProductSize: number;

    @HasMany(() => ImageReview, "idReview")
    images?: ImageReview[];
}