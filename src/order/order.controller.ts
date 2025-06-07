import {
  Controller,
  Post,
  Get,
  Param,
  Body,
} from '@nestjs/common';

import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { Order } from './entities/order.entity';

/**
 * Controller responsible for handling order-related endpoints.
 */
@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  /**
   * Place a new order for beverages.
   * @param createOrderDto DTO containing customer info and order items.
   * @returns The newly created Order entity.
   */
  @Post()
  async createOrder(
    @Body() createOrderDto: CreateOrderDto,
  ): Promise<Order> {
    return this.orderService.createOrder(createOrderDto);
  }

  /**
   * Retrieve a list of all orders.
   * @returns Array of Order entities.
   */
  @Get()
  async findAllOrders(): Promise<Order[]> {
    return this.orderService.findAllOrders();
  }

  /**
   * Retrieve a single order by its unique identifier.
   * @param id UUID of the order.
   * @returns The requested Order entity.
   */
  @Get(':id')
  async findOneOrder(@Param('id') id: string): Promise<Order> {
    return this.orderService.findOneOrder(id);
  }
}
