/**
 * OrderService handles the creation and retrieval of customer orders.
 * Utilizes transactions to ensure atomicity of multi-step order processing.
 */
import {
  Injectable,
  NotFoundException,
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

import { BeverageService } from '../beverage/beverage.service';
import { Order } from './entities/order.entity';
import { OrderItem } from './entities/order-item.entity';
import { CreateOrderDto } from './dto/create-order.dto';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,

    @InjectRepository(OrderItem)
    private readonly orderItemRepository: Repository<OrderItem>,

    private readonly beverageService: BeverageService,
    private readonly dataSource: DataSource,
  ) {}

  /**
   * Creates a new order along with its items in a single database transaction.
   * @param createOrderDto - DTO containing customer info and requested items
   * @returns The fully populated Order entity with items and relations
   * @throws BadRequestException if no items are provided
   * @throws NotFoundException if a requested price link does not exist
   * @throws InternalServerErrorException if the saved order cannot be reloaded
   */
  public async createOrder(
    createOrderDto: CreateOrderDto,
  ): Promise<Order> {
    const { customerName, customerContact, items } = createOrderDto;

    if (!items || items.length === 0) {
      throw new BadRequestException('Order must include at least one item');
    }

    return this.dataSource.transaction(async (manager) => {
      const orderRepo = manager.getRepository(Order);
      const itemRepo = manager.getRepository(OrderItem);

      // Initialize order
      const order = orderRepo.create({
        customerName,
        customerContact,
        confirmationNumber: uuidv4(),
        totalPrice: 0,
      });
      await orderRepo.save(order);

      let totalPrice = 0;
      const createdItems: Promise<OrderItem>[] = [];

      // Process each item: validate, calculate, and save
      for (const dto of items) {
        const priceLink = await this.beverageService.findPriceLinkByTypeAndSize(
          dto.beverageTypeId,
          dto.beverageSizeId,
        );
        if (!priceLink) {
          throw new NotFoundException(
            `Price link not found for typeId=${dto.beverageTypeId} & sizeId=${dto.beverageSizeId}`,
          );
        }

        const unitPrice = Number(priceLink.price);
        const lineTotal = unitPrice * dto.quantity;
        totalPrice += lineTotal;

        const item = itemRepo.create({
          order,
          beverageType: priceLink.beverageType,
          beverageSize: priceLink.beverageSize,
          quantity: dto.quantity,
          unitPrice,
          lineTotal,
        });
        createdItems.push(itemRepo.save(item));
      }

      // Save all items in parallel
      await Promise.all(createdItems);

      // Update and persist total price
      order.totalPrice = totalPrice;
      await orderRepo.save(order);

      // Reload the complete order with relations
      const fullOrder = await orderRepo.findOne({
        where: { id: order.id },
        relations: ['items', 'items.beverageType', 'items.beverageSize'],
      });

      if (!fullOrder) {
        throw new InternalServerErrorException(
          'Unable to retrieve order after creation',
        );
      }

      return fullOrder;
    });
  }

  /**
   * Retrieves all orders, including their related items and pricing info.
   * @returns Array of Order entities
   */
  public async findAllOrders(): Promise<Order[]> {
    return this.orderRepository.find({
      relations: ['items', 'items.beverageType', 'items.beverageSize'],
    });
  }

  /**
   * Retrieves a single order by its ID.
   * @param id - Order UUID
   * @returns The Order entity
   * @throws NotFoundException if no order matches the given ID
   */
  public async findOneOrder(id: string): Promise<Order> {
    const order = await this.orderRepository.findOne({
      where: { id },
      relations: ['items', 'items.beverageType', 'items.beverageSize'],
    });
    if (!order) {
      throw new NotFoundException(`Order with id=${id} not found`);
    }
    return order;
  }
}
