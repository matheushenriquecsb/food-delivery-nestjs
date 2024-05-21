import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { FoodRequestDto } from './dto/food-request.dto';
import { Food } from './entities/food.entity';

@Injectable()
export class FoodService {
  constructor(
    @InjectRepository(Food)
    private foodsRepository: Repository<Food>,
  ) {}

  async addFood(payload: FoodRequestDto, image: any): Promise<void> {
    const food = new Food();

    food.name = payload.name;
    food.description = payload.description;
    food.category = payload.category;
    food.price = payload.price;
    food.image = image.filename;

    this.foodsRepository.create(food);
  }

  async getFoods(): Promise<Food[]> {
    try {
      const foods = await this.foodsRepository.find();
      return foods;
    } catch (e) {
      throw new Error(e);
    }
  }
  async removeFood(id: string): Promise<void> {
    try {
      const food = await this.foodsRepository.findOneBy({ id: +id });
      await this.foodsRepository.delete(food);
    } catch (e) {
      throw new Error(e);
    }
  }
}
