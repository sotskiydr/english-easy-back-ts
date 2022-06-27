import {ApiProperty} from "@nestjs/swagger";
import { IsOptional, IsString } from "class-validator";

export class UpdateWordDto {
    @ApiProperty({ example: 'Яблоко', description: 'russian word' })
    @IsOptional()
    @IsString({ message: 'Слово должно быть строкой' })
    readonly wordRu: string;

    @ApiProperty({ example: 'Apple', description: 'english word' })
    @IsOptional()
    @IsString({ message: 'Слово должно быть строкой' })
    readonly wordEn: string;
}