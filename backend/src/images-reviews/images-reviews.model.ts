import { ApiProperty } from "@nestjs/swagger";
import { Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { Review } from "src/reviews/reviews.model";

interface ImageReviewCreationAttrs{
    url: string;
    idReview: number;
}

@Table({tableName: 'images_reviews', createdAt: false, updatedAt: false})
export class ImageReview extends Model<ImageReview, ImageReviewCreationAttrs>{
    @ApiProperty({example: 1, description: 'Unique identifier', required: false})
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @ApiProperty({example: 'image.png', description: 'Url to image', required: true})
    @Column({type: DataType.STRING, allowNull: false})
    url: string;

    @ForeignKey(() => Review)
    @ApiProperty({example: 1, description: 'Unique identifier review', required: false})
    @Column({type: DataType.INTEGER, allowNull: false})
    idReview: number;
}