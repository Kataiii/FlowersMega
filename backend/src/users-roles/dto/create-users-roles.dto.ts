import { ApiProperty } from "@nestjs/swagger";

export class CreateUserRoleDto{
    @ApiProperty({example: 1, description: 'Id user', required: true})
    readonly userId : number;

    @ApiProperty({example: 1, description: 'Id role', required: true})
    readonly roleId: number;
}