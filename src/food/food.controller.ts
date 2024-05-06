import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { v4 as uuidv4 } from 'uuid';

import { FoodRequestDto } from './dto/food-request.dto';
import { FoodService } from './food.service';

@Controller('food')
export class FoodController {
  constructor(private readonly foodService: FoodService) {}

  @Post()
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
          const filename = `${uuidv4()}-${file.originalname}`;
          cb(null, filename);
        },
      }),
    }),
  )
  async createFood(
    @UploadedFile()
    image: Express.Multer.File,
    @Body() foodDto: FoodRequestDto,
  ) {
    return this.foodService.addFood(foodDto, image);
  }

  @Get()
  getFoods() {
    return this.foodService.getFoods();
  }

  @Delete(':id')
  async removeFood(@Param('id') id: string) {
    return this.foodService.removeFood(id);
  }
}
