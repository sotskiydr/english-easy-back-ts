import { Controller, Post, Body, Get, HttpCode } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { WordsService } from './words.service';
import { CreateWordDto } from './dto/create-word.dto';
import { GetAllWordsDto } from './dto/get-all-words.dto';

@ApiTags('Words')
@Controller('words')
export class WordsController {

    constructor(private wordsService: WordsService) { }
    
    @ApiOperation({summary: "Add new word"})
    @ApiResponse({ status: 201, type: CreateWordDto })
    @Post()
    create(@Body() createWordDto: CreateWordDto) {
        return this.wordsService.create(createWordDto);
    }

    @ApiOperation({summary: "Get all words"})
    @ApiResponse({type: GetAllWordsDto})
    @Get()
    getAll() {
        return this.wordsService.getAll();
    }
}
