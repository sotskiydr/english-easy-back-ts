import { ApiProperty } from "@nestjs/swagger";
import { CreateWordDto } from "./create-word.dto";

export class GetAllWordsDto {
    @ApiProperty({ type: [CreateWordDto] })
    readonly words: CreateWordDto[];

    @ApiProperty()
    readonly total: {
totalPages: number;
  currentPage: number;
  totalWords: number;
    };

}