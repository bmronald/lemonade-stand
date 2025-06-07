/**
 * @module OrderModule
 *
 * Encapsulates order-related controllers, services, and TypeORM entities.
 * Uses forwardRef to avoid potential circular dependencies with BeverageModule.
 * Exports OrderService for reuse in other modules
 */

import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { OrderService } from './order.service';
import { OrderController } from './order.controller';

import { Order } from './entities/order.entity';
import { OrderItem } from './entities/order-item.entity';

import { BeverageModule } from '../beverage/beverage.module';

@Module({
  imports: [
    // Register Order and OrderItem entities with TypeORM
    TypeOrmModule.forFeature([Order, OrderItem]),

    // Import BeverageModule to fetch pricing; forwardRef guards against circular imports
    forwardRef(() => BeverageModule),
  ],
  providers: [OrderService],
  controllers: [OrderController],
  exports: [OrderService],
})
export class OrderModule {}
