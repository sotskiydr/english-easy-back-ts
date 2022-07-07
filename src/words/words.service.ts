import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { CreateWordDto } from "./dto/create-word.dto";
import { Word, WordDocument } from "./word.schema";
import adminsWords from "../../data/voc.json";
import { UsersService } from "../users/users.service";

@Injectable()
export class WordsService {
  constructor(
    @InjectModel(Word.name) private wordSchema: Model<WordDocument>,
    private userService: UsersService,
  ) {}

  async create(wordDto: CreateWordDto) {
    try {
      const newWord = new this.wordSchema(wordDto);
      const existWord = await this.wordSchema
        .findOne({ wordEn: newWord.wordEn })
        .exec();
      if (existWord) {
        throw new HttpException(
          `${newWord.wordEn} already exist`,
          HttpStatus.CONFLICT
        );
      }
      await newWord.save();
      return newWord;
    } catch (error) {
      console.log(error.message);
    }
  }

  async getAll() {
    const allWords = await this.wordSchema.find();
    return allWords;
  }

  async getAdminsWords(email: string) {
    const isAdmin = await this.userService.checkAdminRole(email);
    if(isAdmin) return adminsWords
    return 'user is not ADMIN'
  }
}
