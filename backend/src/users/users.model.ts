import { ApiProperty } from "@nestjs/swagger";
import { BelongsToMany, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { City } from "src/cities/cities.model";
import { Role } from "src/roles/roles.model";
import { UsersRoles } from "src/users-roles/users-roles.model";

interface UserCreationAttrs{
    firstname: string;
    email: string;
    phone: string;
    password: string;
}

@Table({tableName: 'users', createdAt: true, updatedAt: true})
export class User extends Model<User, UserCreationAttrs>{
    @ApiProperty({example: 1, description: 'Unique identifier', required: false})
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @ApiProperty({example: 'Иванов', description: 'Surname', required: false})
    @Column({type: DataType.STRING, allowNull: true})
    surname?: string;

    @ApiProperty({example: 'Иван', description: 'Name', required: true})
    @Column({type: DataType.STRING, allowNull: false})
    firstname: string;

    @ApiProperty({example: 'Иванович', description: 'Patronymic', required: false})
    @Column({type: DataType.STRING, allowNull: true})
    patronymic?: string;

    @ApiProperty({example: '+79999999999', description: 'Phone', required: true})
    @Column({type: DataType.STRING, allowNull: false})
    phone: string;

    @ApiProperty({example: 'email@mail.ru', description: 'Email', required: true})
    @Column({type: DataType.STRING, unique: true, allowNull: false})
    email: string;

    @ApiProperty({example: false, description: 'Is checked email', required: false})
    @Column({type: DataType.BOOLEAN, unique: false, allowNull: false, defaultValue: false})
    checkedEmail: boolean;

    @ApiProperty({example: 'qwerty', description: 'Password', required: true})
    @Column({type: DataType.STRING, allowNull: false})
    password: string;

    @ForeignKey(() => City)
    @ApiProperty({example: 1, description: 'Unique identifie', required: false})
    @Column({type: DataType.INTEGER, allowNull: true})
    idCity?: number;

    @ApiProperty({example: 'image.png', description: 'Avatar image url', required: false})
    @Column({type: DataType.STRING, allowNull: true})
    urlAvatar?: string;

    @BelongsToMany(() => Role, () => UsersRoles)
    roles: Role[];
}