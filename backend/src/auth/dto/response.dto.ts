import { ApiProperty } from "@nestjs/swagger";
import { ResponseDto, UserDto } from "src/users/dto/user.dto";

export class AuthResponseDto{
    @ApiProperty({example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...", description: 'Refresh token', required: true})
    readonly refreshToken: string;

    @ApiProperty({example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...', description: 'Access token', required: true})
    readonly accessToken : string;

    @ApiProperty({type: ResponseDto,  description: 'User info', required: true})
    readonly user: UserDto;
}