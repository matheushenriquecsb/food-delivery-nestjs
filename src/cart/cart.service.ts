import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { User } from '../users/entities/user.entity';
import { CartItemsDto } from './dto/cart-request.dto';

@Injectable()
export class CartService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private jwtService: JwtService,
  ) {}

  async addToCart(payload: CartItemsDto, token: string) {
    const { id } = await this.jwtService.verify(token);

    const addCart = await this.userModel.findByIdAndUpdate(
      { _id: id },
      { cartData: payload.cartItems },
    );

    return addCart;
  }

  public async findUser(userId: string) {
    const user = await this.userModel.findOne({
      _id: userId,
    });

    return user;
  }
}
