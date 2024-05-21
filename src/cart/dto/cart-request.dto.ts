import { IsInt, IsNotEmpty, IsObject, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

class CartItem {
  @ApiProperty({
    example: '5',
    required: true,
  })
  @IsNotEmpty()
  @IsInt()
  id: number;

  @ApiProperty({
    example: '5',
    required: true,
  })
  @IsNotEmpty()
  @IsInt()
  quantity: number;
}

export class CartItemsDto {
  @IsNotEmpty()
  @IsObject()
  @ValidateNested()
  @Type(() => CartItem)
  cartItems: { [key: number]: CartItem };
}
