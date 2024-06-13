import { ApiProperty } from "@nestjs/swagger";

export class UpdateUserDto{
    @ApiProperty({example: 'Иванов', description: 'Surname', required: false})
    surname?: string;

    @ApiProperty({example: 'Иван', description: 'Name', required: false})
    firstname?: string;

    @ApiProperty({example: 'Иванович', description: 'Patronymic', required: false})
    patronymic?: string;

    @ApiProperty({example: '+79999999999', description: 'Phone', required: false})
    phone?: string;

    @ApiProperty({example: 'email@mail.ru', description: 'Email', required: false})
    email?: string;

    @ApiProperty({example: false, description: 'Is checked email', required: false})
    checkedEmail?: boolean;

    @ApiProperty({example: 'qwerty', description: 'Password', required: false})
    password?: string;

    @ApiProperty({example: 1, description: 'Unique identifie', required: false})
    idCity?: number;

    @ApiProperty({example: 'image.png', description: 'Avatar image url', required: false})
    urlAvatar?: string;
}