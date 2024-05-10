import { Body, Controller, Headers, Post } from '@nestjs/common';
import { OrderService } from './order.service';
import { PlaceOrderDto } from './dto/order-request.dto';

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
}
