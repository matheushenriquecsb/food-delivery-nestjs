import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { CardItems } from './entities/card.entity';
import { CartItemsDto } from './dto/cart-request.dto';
import { UsersService } from '../users/users.service';

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(CardItems)
    private cardRepository: Repository<CardItems>,
    private jwtService: JwtService,
    private readonly userService: UsersService,
  ) {}

  async addToCart(payload: CartItemsDto, token: string): Promise<void | any> {
    const { id } = await this.jwtService.verify(token);
    const user = await this.userService.findUser(id);
    try {
      for (const key in payload) {
        if (Object.hasOwnProperty.call(payload, key)) {
          console.log(payload);
          const cartItem = payload[key];
          const foodId = Object.keys(cartItem)[0];
          const quantity = cartItem[foodId];

          await this.cardRepository.save({
            user: user,
            foodId: +foodId,
            quantity: quantity,
          });
        }
      }
    } catch (error) {
      return { error: error };
    }
  }
}
