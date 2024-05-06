import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Model } from 'mongoose';
import { FoodRequestDto } from './dto/food-request.dto';
import { Food } from './entities/food.entity';

@Injectable()
export class FoodService {
  constructor(@InjectModel(Food.name) private foodModel: Model<Food>) {}

  async addFood(payload: FoodRequestDto, image: any): Promise<void> {
    const food = new Food();

    food.name = payload.name;
    food.description = payload.description;
    food.category = payload.category;
    food.price = payload.price;
    food.image = image.filename;

    await this.foodModel.create(food);
  }

  async getFoods(): Promise<Food[]> {
    return this.foodModel.find();
  }

  async removeFood(id: string): Promise<void> {
    await this.foodModel.findByIdAndDelete(id);
  }
}
