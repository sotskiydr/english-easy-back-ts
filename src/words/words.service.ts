import { HttpException, HttpStatus, Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { CreateWordDto } from "./dto/create-word.dto";
import { Word, WordDocument } from "./word.schema";
import { UpdateWordDto } from './dto/update-word.dto';
import adminsWords from "../data/voc.json";
import { UsersService } from "../users/users.service";
import { User } from "../users/user.schema";


@Injectable()
export class WordsService {
  constructor(
    @InjectModel(Word.name) private wordSchema: Model<WordDocument>,
    private userService: UsersService,
  ) {}

  async getAll() {
    const allWords = await this.wordSchema.find();
    return allWords;
  }

  async getAdminsWords(email: string) {
    const isAdmin = await this.userService.checkAdminRole(email);
    if(isAdmin) return adminsWords
    return 'user is not ADMIN'
  }


  async getOwnWords(id: number) {
    const myVocabulary = await this.wordSchema.find({ owner: id })
    if (myVocabulary) {
      return myVocabulary;
    }
    throw new HttpException('Add words to your own vocabulary', HttpStatus.NOT_FOUND)
  }

  async updateWord(id: number, updateWord: UpdateWordDto) {
    const updatedWord = await this.wordSchema.findByIdAndUpdate(id, updateWord);
    if (!updatedWord) {
      throw new NotFoundException();
    }
    return updatedWord;
  }

  async deleteWord(id: number) {
    const deletedWord = await this.wordSchema.findByIdAndDelete(id);
    if (!deletedWord) {
      throw new NotFoundException();
    }
    return "Deleted successfuly"
  }

  async create(wordDto: CreateWordDto, owner: User) {
      const newWord =  new this.wordSchema({...wordDto, owner})
      const existWord = await this.wordSchema.findOne({wordEn: newWord.wordEn}).exec();
      if (existWord) {
          throw new HttpException(`Word ${newWord.wordEn} already exist`, HttpStatus.CONFLICT)
      }
      await newWord.save()
      return newWord
  }
}
