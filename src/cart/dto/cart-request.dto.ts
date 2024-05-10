import { IsOptional } from 'class-validator';

export class CartItemsDto {
  @IsOptional()
  cartItems: string;
}
