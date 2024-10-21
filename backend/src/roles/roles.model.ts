import { Model, Column, DataType, Table, BelongsToMany } from "sequelize-typescript";
import { ApiProperty } from "@nestjs/swagger";
import { User } from "src/users/users.model";
import { UsersRoles } from "src/users-roles/users-roles.model";


interface RoleCreationAttrs{
    name: string;
}

@Table({tableName: 'roles', createdAt: false, updatedAt: false})
export class Role extends Model<Role, RoleCreationAttrs>{
    @ApiProperty({example: 1, description: 'Уникальный идентификатор', required: false})
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @ApiProperty({example: 'user', description: 'Название роли', required: true})
    @Column({type: DataType.STRING, allowNull: false})
    name: string;

    @BelongsToMany(() => User, () => UsersRoles)
    users: User[];
}