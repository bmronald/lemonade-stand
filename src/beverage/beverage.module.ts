import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { BeverageService } from './beverage.service';
import { BeverageController } from './beverage.controller';

import { BeverageType } from './entities/beverage-type.entity';
import { BeverageSize } from './entities/beverage-size.entity';
import { PriceLink }    from './entities/price-link.entity';

@Module({
  imports: [TypeOrmModule.forFeature([BeverageType, BeverageSize, PriceLink])],
  providers: [BeverageService],
  controllers: [BeverageController],
  exports: [BeverageService],
})
export class BeverageModule {}