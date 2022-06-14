import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Word, WordSchema } from './word.schema';
import { WordsController } from './words.controller';
import { WordsService } from './words.service';

@Module({
  controllers: [WordsController],
  providers: [WordsService],
  imports: [
    MongooseModule.forFeature([{
      name: Word.name, schema: WordSchema
    }]),
  ]
})
export class WordsModule {}
