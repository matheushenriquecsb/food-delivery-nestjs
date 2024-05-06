/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type FoodDocument = HydratedDocument<Food>;

@Schema()
export class Food {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  price: number;

  @Prop({ required: true })
  image: string;

  @Prop({ required: true })
  category: string;
}

export const FoodSchema = SchemaFactory.createForClass(Food);
