import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { User } from '../users/entities/user.entity';
import { UsersModule } from '../users/users.module';
import { UsersService } from '../users/users.service';
import { CartController } from './cart.controller';
import { CartService } from './cart.service';
import { CardItems } from './entities/card.entity';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forFeature([User, CardItems]),
    UsersModule,
  ],
  controllers: [CartController],
  providers: [CartService, UsersService],
})
export class CartModule {}
