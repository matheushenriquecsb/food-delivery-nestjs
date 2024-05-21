import { Body, Controller, Headers, Post, UseGuards } from '@nestjs/common';
import { CartService } from './cart.service';
import { AuthGuard } from './guards/auth.guard';
import { CartItemsDto } from './dto/cart-request.dto';

@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Post('add')
  @UseGuards(AuthGuard)
  addToCart(
    @Body() cartDto: CartItemsDto,
    @Headers('token') token: string,
  ): Promise<void> {
    return this.cartService.addToCart(cartDto, token);
  }
}
