import { Controller, Post, Body, Get, UseGuards, Req, Put, Delete, Param } from '@nestjs/common';
import { ApiCreatedResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { WordsService } from './words.service';
import { CreateWordDto } from './dto/create-word.dto';
import { GetAllWordsDto } from './dto/get-all-words.dto';
import { UpdateWordDto } from './dto/update-word.dto';
import { JwtAuthGuard } from "../auth/jwt-auth.guard";

@ApiTags('Words')
@Controller('words')
export class WordsController {

    constructor(private wordsService: WordsService) { }
    
    @ApiOperation({summary: "Add new word"})
    @ApiCreatedResponse({ type: CreateWordDto })
    @Post('/create')
    @UseGuards(JwtAuthGuard)
    create(@Body() createWordDto: CreateWordDto, @Req() req: any) {
        return this.wordsService.create(createWordDto, req.user.id);
    }

    @ApiOperation({summary: "Get all words"})
    @ApiOkResponse({type: GetAllWordsDto})
    @Get('/getall')
    @UseGuards(JwtAuthGuard)
    getAll() {
        return this.wordsService.getAll();
    }

    @ApiOperation({summary: "Own vocabulary"})
    @ApiOkResponse({type: GetAllWordsDto})
    @Get('/vocabulary')
    @UseGuards(JwtAuthGuard)
    getOwnWords(@Req() req: any) {
        return this.wordsService.getOwnWords(req.user.id);
    }

    @ApiOperation({summary: "Update word"})
    @ApiOkResponse({type: UpdateWordDto})
    @Put('/:id')
    @UseGuards(JwtAuthGuard)
    updateWord(@Param('id') id: number, @Body() updateWordDto: UpdateWordDto) {
        return this.wordsService.updateWord(id, updateWordDto);
    }

    @ApiOperation({summary: "Delete word"})
    @ApiOkResponse({description: 'Deleted successfuly'})
    @Delete('/:id')
    @UseGuards(JwtAuthGuard)
    deleteWord(@Param('id') id: number) {
        return this.wordsService.deleteWord(id);
    }
}
