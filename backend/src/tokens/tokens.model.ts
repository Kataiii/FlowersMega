import { Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { User } from "src/users/users.model";

interface TokenCreateAttrs{
    refreshToken: string;
    idUser: number;
    ip: string;
}

@Table({tableName: 'refresh_tokens'})
export class Token extends Model<Token, TokenCreateAttrs>{
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @Column({type: DataType.TEXT, unique: false})
    refreshToken: string;

    @ForeignKey(() => User)
    @Column({type: DataType.INTEGER, unique: false, allowNull: false})
    idUser: number;

    @Column({type: DataType.STRING, unique: false, allowNull: true})
    ip: string;
}