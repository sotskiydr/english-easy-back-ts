import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as SchemaM} from 'mongoose';
import { User } from 'src/users/user.schema';

export type WordDocument = Word & Document;

@Schema()
export class Word {
  @Prop({required: true})
  wordRu: string;

  @Prop({required: true})
  wordEn: string;

  @Prop({ type: SchemaM.Types.ObjectId, ref: User.name, required: true })
  owner: User;
}

export const WordSchema = SchemaFactory.createForClass(Word);