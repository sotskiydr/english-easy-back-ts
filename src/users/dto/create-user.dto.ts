import {ApiProperty} from "@nestjs/swagger";

export class CreateUserDto {

    @ApiProperty({example: 'John', description: "user name"})
    readonly name: string;

    @ApiProperty({example: 'user@gmail.com', description: 'email'})
    readonly email: string;

    @ApiProperty({example: '098765Am43', description: 'user password'})
    readonly password: string;
}