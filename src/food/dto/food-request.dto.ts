import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class FoodRequestDto {
  @ApiProperty({
    name: 'Greek Salad',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    name: 'Its a light, vibrant dish that brings the flavors',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  description: string;

  @ApiProperty({
    name: '25',
    required: true,
  })
  @IsNotEmpty()
  @IsNumber()
  price: number;

  @ApiProperty({
    name: 'Salad',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  category: string;

  @ApiProperty({
    name: 'greeksalad.png',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  image: string;
}
