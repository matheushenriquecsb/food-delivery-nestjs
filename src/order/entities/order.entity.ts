import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type PlaceOrderDocument = HydratedDocument<PlaceOrder>;

class Address {
  @Prop({ required: true })
  firstName: string;

  @Prop({ required: true })
  lastName: string;

  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  street: string;

  @Prop({ required: true })
  city: string;

  @Prop({ required: true })
  state: string;

  @Prop({ required: true })
  zipCode: string;

  @Prop({ required: true })
  country: string;

  @Prop({ required: true })
  phone: string;
}

class Item {
  @Prop({ required: true })
  _id: string;

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

  @Prop({ required: true })
  quantity: number;
}

@Schema({ timestamps: true })
export class PlaceOrder {
  @Prop({ type: Address, Item })
  orderData: {
    userId: string;
    address: Address;
    items: Item[];
    amount: number;
  };
  @Prop({ default: true })
  payment: boolean;

  @Prop({ default: 'Food Processing' })
  status: string;
}

export const PlaceOrderSchema = SchemaFactory.createForClass(PlaceOrder);
