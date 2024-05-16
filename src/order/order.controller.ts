import { Body, Controller, Headers, Post } from '@nestjs/common';
import { OrderService } from './order.service';
import { PlaceOrderDto } from './dto/order-request.dto';
import { VerifyOrder } from './dto/verify-order.dto';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  async placeOrder(
    @Body() payload: PlaceOrderDto,
    @Headers('token') token: string,
  ) {
    return await this.orderService.placeOrder(payload, token);
  }

  @Post('/verify')
  async verifyOrder(@Body() payload: VerifyOrder) {
    return this.orderService.verifyOrder(payload);
  }

  @Post('/my-orders')
  async userOrders(
    @Body() payload: VerifyOrder,
    @Headers('token') token: string,
  ) {
    return this.orderService.usersOrders(payload, token);
  }
}
