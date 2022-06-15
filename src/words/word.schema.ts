import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type WordDocument = Word & Document;

@Schema()
export class Word {
  @Prop({required: true})
  wordRu: string;

  @Prop({required: true})
  wordEn: string;

  // @Prop({ required: true })
  // owner: string;
}

export const WordSchema = SchemaFactory.createForClass(Word);