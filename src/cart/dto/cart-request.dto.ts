import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export class CartItemsDto {
  @ApiProperty()
  @IsOptional()
  cartItems: string;
}
