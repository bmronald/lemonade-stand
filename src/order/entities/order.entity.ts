import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  CreateDateColumn,
} from 'typeorm';
import { OrderItem } from './order-item.entity';

@Entity({ name: 'orders' })
export class Order {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  customerName: string;

  @Column()
  customerContact: string; // phone or email

  @Column({ unique: true })
  confirmationNumber: string; // e.g. generated token

  @Column('decimal', { precision: 9, scale: 2 })
  totalPrice: number;

  @CreateDateColumn()
  createdAt: Date;

  @OneToMany(() => OrderItem, (item) => item.order, {
    cascade: ['insert'], // so that saving Order auto‐saves its items
    eager: true,
  })
  items: OrderItem[];
}