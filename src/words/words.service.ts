import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { User } from 'src/users/user.schema';
import { CreateWordDto } from './dto/create-word.dto';
import { Word, WordDocument } from './word.schema';

@Injectable()
export class WordsService {
  constructor(@InjectModel(Word.name) private wordSchema: Model<WordDocument>) {}

    async create(wordDto: CreateWordDto, owner: User) {
            const newWord =  new this.wordSchema({...wordDto, owner})
            const existWord = await this.wordSchema.findOne({wordEn: newWord.wordEn}).exec();
            if (existWord) {
                throw new HttpException(`Word ${newWord.wordEn} already exist`, HttpStatus.CONFLICT) 
            }
            await newWord.save()
            return newWord    
    }

    async getAll() {
        const allWords = await this.wordSchema.find()
    return allWords
}

    async getOwnWords(id: number) {
        const myVocabulary = await this.wordSchema.find({ owner: id })
        if (myVocabulary) {
             return myVocabulary;
        }
       throw new HttpException('Add words to your own vocabulary', HttpStatus.NOT_FOUND)
    }
}
