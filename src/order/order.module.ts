/**
 * @module OrderModule
 *
 * Encapsulates order-related controllers, services, and TypeORM entities.
 * Imports BeverageModule to access pricing logic.
 */

import { Module }       from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { OrderService }    from './order.service';
import { OrderController } from './order.controller';

import { Order }     from './entities/order.entity';
import { OrderItem } from './entities/order-item.entity';

import { BeverageModule } from '../beverage/beverage.module';

@Module({
  imports: [
    // Register Order and OrderItem entities with TypeORM
    TypeOrmModule.forFeature([Order, OrderItem]),

    // Simple import—no circular dependency expected
    BeverageModule,
  ],
  providers: [OrderService],
  controllers: [OrderController],
  exports: [OrderService],
})
export class OrderModule {}
