import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  @Prop({ required: false })
  name: string;

  @Prop({ required: false })
  email: string;

  @Prop({ required: false })
  password: string;

  @Prop({ required: false })
  cartData: string[];
}

export const UserSchema = SchemaFactory.createForClass(User);
