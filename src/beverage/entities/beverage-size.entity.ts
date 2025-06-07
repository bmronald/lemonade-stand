import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
} from 'typeorm';
import { PriceLink } from './price-link.entity';

@Entity({ name: 'beverage_sizes' })
export class BeverageSize {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  name: string; 

  // One size can appear in many PriceLinks (one per beverage type)
  @OneToMany(() => PriceLink, (price) => price.beverageSize, {
    cascade: ['insert', 'update'],
  })
  priceLinks: PriceLink[];
}