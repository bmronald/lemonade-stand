import {
  Controller,
  Post,
  Get,
  Param,
  Body,
  HttpCode,
  HttpStatus,
  ParseUUIDPipe,
} from '@nestjs/common';
import { ApiTags, ApiResponse } from '@nestjs/swagger';

import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { Order } from './entities/order.entity';

@ApiTags('orders')
@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  /**
   * Place a new order for beverages.
   * @param createOrderDto DTO containing customer info and order items.
   * @returns The newly created Order entity.
   * @throws BadRequestException if validation fails or order is empty.
   * @throws NotFoundException if any price link is missing.
   * @throws InternalServerErrorException on unexpected DB issues.
   */
  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiResponse({ status: HttpStatus.CREATED, description: 'Order created successfully.' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Invalid input or empty order.' })
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
  @HttpCode(HttpStatus.OK)
  @ApiResponse({ status: HttpStatus.OK, description: 'List of all orders.' })
  async findAllOrders(): Promise<Order[]> {
    return this.orderService.findAllOrders();
  }

  /**
   * Retrieve a single order by its unique identifier.
   * @param id UUID of the order.
   * @returns The requested Order entity.
   * @throws NotFoundException if order with the given ID does not exist.
   */
  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({ status: HttpStatus.OK, description: 'Order retrieved successfully.' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Invalid UUID format for order ID.' })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Order not found.' })
  async findOneOrder(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ): Promise<Order> {
    return this.orderService.findOneOrder(id);
  }
}
