import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

import { FoodController } from './food.controller';
import { FoodService } from './food.service';
import { Food } from './entities/food.entity';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MulterModule.register({
      dest: './uploads',
    }),
    TypeOrmModule.forFeature([Food]),
  ],
  controllers: [FoodController],
  providers: [FoodService],
})
export class FoodModule {}
