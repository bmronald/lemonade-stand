import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { BeverageType } from './beverage/entities/beverage-type.entity';
import { BeverageSize } from './beverage/entities/beverage-size.entity';
import { PriceLink }    from './beverage/entities/price-link.entity';
import { Order }        from './order/entities/order.entity';
import { OrderItem }    from './order/entities/order-item.entity';

import { BeverageModule } from './beverage/beverage.module';
import { OrderModule }    from './order/order.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST || 'localhost',
      port: +(process.env.DB_PORT || 5432),
      username: process.env.DB_USER || 'postgres',
      password: process.env.DB_PASS || 'postgres',
      database: process.env.DB_NAME || 'lemonade',
      entities: [BeverageType, BeverageSize, PriceLink, Order, OrderItem],
      synchronize: true, 
    }),
    BeverageModule,
    OrderModule,
  ],
})
export class AppModule {}
