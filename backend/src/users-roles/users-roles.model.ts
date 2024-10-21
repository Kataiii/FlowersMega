import { Model, Table, Column, DataType, ForeignKey } from "sequelize-typescript";
import { Role } from "src/roles/roles.model";
import { User } from "src/users/users.model";

interface UsersRolesCreationAttrs{
    userId: number;
    roleId: number;
}

@Table({tableName: 'users_roles', createdAt: false, updatedAt: false})
export class UsersRoles extends Model<UsersRoles, UsersRolesCreationAttrs>{
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @ForeignKey(() => User)
    @Column({type: DataType.INTEGER, unique: false, allowNull: true})
    userId: number;

    @ForeignKey(() => Role)
    @Column({type: DataType.INTEGER, unique: false, allowNull: true})
    roleId: number;
}