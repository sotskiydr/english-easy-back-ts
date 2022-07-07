import { Controller, Post, Body, Get, UseGuards, Req } from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { WordsService } from "./words.service";
import { CreateWordDto } from "./dto/create-word.dto";
import { GetAllWordsDto } from "./dto/get-all-words.dto";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";

@ApiTags("Words")
@Controller("words")
export class WordsController {
  constructor(private wordsService: WordsService) {}

  @ApiOperation({ summary: "Add new word" })
  @ApiResponse({ status: 201, type: CreateWordDto })
  @Post("/create")
  @UseGuards(JwtAuthGuard)
  create(@Body() createWordDto: CreateWordDto) {
    return this.wordsService.create(createWordDto);
  }

  @ApiOperation({ summary: "Get all words" })
  @ApiResponse({ type: GetAllWordsDto })
  @Get("/getallwords")
  @UseGuards(JwtAuthGuard)
  getAll() {
    return this.wordsService.getAll();
  }

  @Get("/get-admins-words")
  @ApiResponse({ type: GetAllWordsDto })
  @UseGuards(JwtAuthGuard)
  getAdminsWords(@Req() user) {
    return this.wordsService.getAdminsWords(user.user.email);
  }
}
