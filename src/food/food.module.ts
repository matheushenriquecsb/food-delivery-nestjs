import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MulterModule } from '@nestjs/platform-express';

import { Food, FoodSchema } from './entities/food.entity';
import { FoodController } from './food.controller';
import { FoodService } from './food.service';

@Module({
  imports: [
    MulterModule.register({
      dest: './uploads',
    }),
    MongooseModule.forFeature([{ name: Food.name, schema: FoodSchema }]),
  ],
  controllers: [FoodController],
  providers: [FoodService],
})
export class FoodModule {}
