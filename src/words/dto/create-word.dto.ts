import {ApiProperty} from "@nestjs/swagger";
import { IsEmail, IsString, Length } from "class-validator";

export class CreateWordDto {
    @ApiProperty({ example: 'Яблоко', description: 'russian word' })
    @IsString({ message: 'Слово должно быть строкой' })
    readonly wordRu: string;

    @ApiProperty({ example: 'Apple', description: 'english word' })
    @IsString({ message: 'Слово должно быть строкой' })
    readonly wordEn: string;
}