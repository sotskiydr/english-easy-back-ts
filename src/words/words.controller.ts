import { Controller, Post, Body, Get, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { WordsService } from './words.service';
import { CreateWordDto } from './dto/create-word.dto';
import { GetAllWordsDto } from './dto/get-all-words.dto';
import { Users } from 'src/auth/user.decorators';
import { JwtAuthGuard } from "../auth/jwt-auth.guard";

@ApiTags('Words')
@Controller('words')
export class WordsController {

    constructor(private wordsService: WordsService) { }
    
    @ApiOperation({summary: "Add new word"})
    @ApiResponse({ status: 201, type: CreateWordDto })
    @Post()
    @UseGuards(JwtAuthGuard)
        // @Users()
    create(@Body() createWordDto: CreateWordDto) {
        return this.wordsService.create(createWordDto);
    }

    @ApiOperation({summary: "Get all words"})
    @ApiResponse({type: GetAllWordsDto})
    @Get()
    @UseGuards(JwtAuthGuard)
        // @Users()
    getAll() {
        return this.wordsService.getAll();
    }
}
