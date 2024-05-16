import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import Stripe from 'stripe';

import { PlaceOrderDto } from './dto/order-request.dto';
import { PlaceOrder } from './entities/order.entity';
import { VerifyOrder } from './dto/verify-order.dto';

@Injectable()
export class OrderService {
  constructor(
    @InjectModel(PlaceOrder.name) private orderModel: Model<PlaceOrder>,
    private jwtService: JwtService,
  ) {}

  async placeOrder(payload: PlaceOrderDto, token: string) {
    const { id } = await this.jwtService.verify(token);

    try {
      const newOrder = new this.orderModel({
        orderData: {
          ...payload,
          userId: id,
        },
        payment: false,
        status: 'Food Processing',
      });

      await newOrder.save();

      const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

      const orderItems = payload.orderData.items.map((item) => ({
        price_data: {
          currency: 'brl',
          product_data: {
            name: item.name,
          },
          unit_amount: item.price * 100,
        },
        quantity: item.quantity,
      }));

      orderItems.push({
        price_data: {
          currency: 'brl',
          product_data: {
            name: 'Delivery Charges',
          },
          unit_amount: 2 * 100,
        },
        quantity: 1,
      });

      const session = await stripe.checkout.sessions.create({
        line_items: orderItems,
        mode: 'payment',
        success_url: `${process.env.FRONTEND_URL}/verify?success=true&orderId=${newOrder._id}`,
        cancel_url: `${process.env.FRONTEND_URL}/verify?success=false&orderId=${newOrder._id}`,
      });

      return {
        success: 'true',
        session_url: session.url,
      };
    } catch (error) {
      return {
        success: false,
        message: error.message,
      };
    }
  }

  async verifyOrder(payload: VerifyOrder) {
    const { success, orderId } = payload;
    try {
      if (Boolean(success) === true) {
        await this.orderModel.findByIdAndUpdate(orderId, {
          payment: 'true',
        });

        return {
          success: true,
          message: 'Paid',
        };
      } else {
        await this.orderModel.findByIdAndDelete(orderId);
        return {
          success: false,
          message: 'Not Paid',
        };
      }
    } catch (e) {
      console.log(e);
      return {
        success: false,
        message: 'Error: ' + e.message,
      };
    }
  }

  async usersOrders(payload, token) {
    const { id } = await this.jwtService.verify(token);
    console.log(id);

    const res = await this.orderModel
      .findOne({ orderData: { userId: id } })
      .exec();
    console.log(res);
    //  return res;
  }
}
