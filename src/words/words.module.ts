import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Word, WordSchema } from './word.schema';
import { WordsController } from './words.controller';
import { WordsService } from './words.service';
import { UsersModule } from 'src/users/users.module';
import { AuthModule } from "../auth/auth.module";

@Module({
  controllers: [WordsController],
  providers: [WordsService],
  imports: [
    MongooseModule.forFeature([{
      name: Word.name, schema: WordSchema
    }]),
    forwardRef(() => AuthModule),
    forwardRef(() => UsersModule),
  ]
})
export class WordsModule {}
