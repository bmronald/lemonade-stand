import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  Unique,
} from 'typeorm';
import { BeverageType } from './beverage-type.entity';
import { BeverageSize } from './beverage-size.entity';

@Entity({ name: 'price_links' })
@Unique(['beverageType', 'beverageSize']) // one price per (type, size)
export class PriceLink {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => BeverageType, (type) => type.priceLinks, {
    eager: true,
    onDelete: 'CASCADE',
  })
  beverageType: BeverageType;

  @ManyToOne(() => BeverageSize, (size) => size.priceLinks, {
    eager: true,
    onDelete: 'CASCADE',
  })
  beverageSize: BeverageSize;

  @Column('decimal', { precision: 7, scale: 2 })
  price: number; // e.g. 2.00, 3.50
}