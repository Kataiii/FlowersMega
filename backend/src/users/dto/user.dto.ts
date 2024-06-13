import { ApiProperty } from "@nestjs/swagger";
import { User } from "../users.model";

export type UserDto = Omit<User, "id">;

export class ResponseDto{
    @ApiProperty({example: 'Иванов', description: 'Surname', required: false})
    readonly surname: string;

    @ApiProperty({example: 'Иван', description: 'Name', required: true})
    readonly firstname: string;

    @ApiProperty({example: 'Иванович', description: 'Patronymic', required: false})
    readonly patronymic: string;

    @ApiProperty({example: '+79999999999', description: 'Phone', required: true})
    readonly phone: string;

    @ApiProperty({example: 'email@mail.ru', description: 'Email', required: true})
    readonly email: string;

    @ApiProperty({example: false, description: 'Is checked email', required: false})
    readonly checkedEmail: boolean;

    @ApiProperty({example: 'qwerty', description: 'Password', required: true})
    readonly password: string;

    @ApiProperty({example: 1, description: 'Unique identifie', required: false})
    readonly idCity: number;

    @ApiProperty({example: 'image.png', description: 'Avatar image url', required: false})
    readonly urlAvatar: string;
}