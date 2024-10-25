import { ApiProperty } from "@nestjs/swagger";
import { Column, DataType, ForeignKey, Model, Table,  } from "sequelize-typescript";

interface TelegramUserAttrs{
    id: number;
    user_tag: string;
    chat_id: number;
    is_active: boolean;
}

@Table({tableName: 'telegram_users', createdAt: true, updatedAt: true})
export class TelegramUser extends Model<TelegramUser, TelegramUserAttrs>{
    @ApiProperty({example: 1, description: 'Unique identifier', required: false})
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @ApiProperty({example: "telegram_user_id", description: 'Tag of Telegram user', required: true})
    @Column({type: DataType.STRING, allowNull: false})
    user_tag: string;

    @ApiProperty({example: "chat_id", description: 'Chat ID of Telegram user', required: true})
    @Column({type: DataType.INTEGER, allowNull: false})
    chat_id: number;

    @ApiProperty({example: true, description: 'Is User accessed the bot', required: true})
    @Column({type: DataType.BOOLEAN, allowNull: false})
    is_active: boolean;
}