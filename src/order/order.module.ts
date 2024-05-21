import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { PlaceOrder } from './entities/order.entity';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { Address } from './entities/address.entity';
import { Item } from './entities/items.entity';
import { User } from '../users/entities/user.entity';
import { UsersModule } from '../users/users.module';
import { UsersService } from '../users/users.service';
import { CardItems } from '../cart/entities/card.entity';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forFeature([PlaceOrder, CardItems, Item, Address, User]),
    UsersModule,
  ],
  controllers: [OrderController],
  providers: [OrderService, UsersService],
})
export class OrderModule {}
