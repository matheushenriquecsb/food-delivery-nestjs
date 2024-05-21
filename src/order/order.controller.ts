import { Body, Controller, Headers, Post } from '@nestjs/common';
import { OrderService } from './order.service';
import { VerifyOrder } from './dto/verify-order.dto';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  async placeOrder(@Body() payload: any, @Headers('token') token: string) {
    return await this.orderService.placeOrder(payload, token);
  }

  @Post('/verify')
  async verifyOrder(
    @Body() payload: VerifyOrder,
  ): Promise<{ success: boolean; message: string }> {
    return this.orderService.verifyOrder(payload);
  }

  @Post('/my-orders')
  async userOrders(@Headers('token') token: string) {
    return this.orderService.usersOrders(token);
  }
}
