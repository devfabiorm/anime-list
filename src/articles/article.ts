import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Person } from './person';

export type ArticleDocument = HydratedDocument<Article>;

@Schema()
export class Article {
  id: number;
  @Prop()
  isPublished: boolean;
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Person' })
  author: Person;
  @Prop()
  content: string;
  @Prop()
  date: Date;
}

export const ArticleSchema = SchemaFactory.createForClass(Article);
