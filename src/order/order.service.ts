import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import Stripe from 'stripe';

import { PlaceOrder } from './entities/order.entity';
import { VerifyOrder } from './dto/verify-order.dto';
import { UsersService } from '../users/users.service';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(PlaceOrder)
    private ordersRepository: Repository<PlaceOrder>,
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async placeOrder(payload: any, token: string) {
    const { id } = await this.jwtService.verify(token);

    const user = await this.usersService.findUser(id);

    try {
      const newOrder = new PlaceOrder();
      newOrder.userId = user;
      newOrder.items = payload.orderData.items;
      newOrder.address = payload.orderData.address;
      newOrder.payment = false;
      newOrder.status = 'Food Processing';
      newOrder.amount = payload.orderData.amount;
      const res = await this.ordersRepository.save(newOrder);

      const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

      const orderItems = payload.orderData.items.map((item: any) => ({
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
        success_url: `${process.env.FRONTEND_URL}/verify?success=true&orderId=${res.id}`,
        cancel_url: `${process.env.FRONTEND_URL}/verify?success=false&orderId=${res.id}`,
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

  async verifyOrder(
    payload: VerifyOrder,
  ): Promise<{ success: boolean; message: string }> {
    try {
      if (Boolean(payload.success) === true) {
        await this.ordersRepository.update(payload.orderId, {
          payment: true,
        });

        return {
          success: true,
          message: 'Paid',
        };
      } else {
        const order = await this.ordersRepository.findOneBy({
          id: payload.orderId,
        });
        await this.ordersRepository.delete(order);
        return {
          success: false,
          message: 'Not Paid',
        };
      }
    } catch (e) {
      return {
        success: false,
        message: 'Error: ' + e.message,
      };
    }
  }

  async usersOrders(token: string) {
    const { id } = await this.jwtService.verify(token);

    const placeOrderUser = await this.ordersRepository.find({
      where: { userId: id },
    });
    console.log(placeOrderUser);
  }
}
