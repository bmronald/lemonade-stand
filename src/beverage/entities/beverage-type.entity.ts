import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
} from 'typeorm';
import { PriceLink } from './price-link.entity';

@Entity({ name: 'beverage_types' })
export class BeverageType {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  name: string;

  // One BeverageType can have many PriceLinks (one per size)
  @OneToMany(() => PriceLink, (price) => price.beverageType, {
    cascade: ['insert', 'update'],
  })
  priceLinks: PriceLink[];
}