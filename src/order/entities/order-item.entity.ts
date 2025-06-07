import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
} from 'typeorm';
import { Order } from './order.entity';
import { BeverageType } from '../../beverage/entities/beverage-type.entity';
import { BeverageSize } from '../../beverage/entities/beverage-size.entity';

@Entity({ name: 'order_items' })
export class OrderItem {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Order, (order) => order.items, {
    onDelete: 'CASCADE',
  })
  order: Order;

  @ManyToOne(() => BeverageType, {
    eager: true,
    onDelete: 'RESTRICT',
  })
  beverageType: BeverageType;

  @ManyToOne(() => BeverageSize, {
    eager: true,
    onDelete: 'RESTRICT',
  })
  beverageSize: BeverageSize;

  @Column('int')
  quantity: number;

  @Column('decimal', { precision: 7, scale: 2 })
  unitPrice: number; // snapshot of price at order time

  @Column('decimal', { precision: 9, scale: 2 })
  lineTotal: number; // unitPrice * quantity
}