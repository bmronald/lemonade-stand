import {
  Controller,
  Post,
  Get,
  Param,
  Body,
} from '@nestjs/common';

import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';

@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  // 1) Place a new order
  @Post()
  createOrder(@Body() dto: CreateOrderDto) {
    return this.orderService.createOrder(dto);
  }

  // 2) (Optional) List all orders
  @Get()
  findAllOrders() {
    return this.orderService.findAllOrders();
  }

  // 3) Get one order by ID
  @Get(':id')
  findOneOrder(@Param('id') id: string) {
    return this.orderService.findOneOrder(id);
  }
}
