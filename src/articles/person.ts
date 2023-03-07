import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type PersonDocument = HydratedDocument<Person>;

@Schema({ collection: 'Authors' })
export class Person {
  id: number;
  @Prop()
  name: string;
  @Prop()
  isAdmin: boolean;
}

export const PersonSchema = SchemaFactory.createForClass(Person);
