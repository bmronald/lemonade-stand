/**
 * @module BeverageModule
 *
 * Registers the beverage-related entities and configures
 * the provider and controller for the Beverage feature.
 * Exports BeverageService for use in other modules.
 */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { BeverageController } from './beverage.controller';
import { BeverageService } from './beverage.service';

import { BeverageType } from './entities/beverage-type.entity';
import { BeverageSize } from './entities/beverage-size.entity';
import { PriceLink } from './entities/price-link.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      BeverageType,
      BeverageSize,
      PriceLink,
    ]),
  ],
  controllers: [BeverageController],
  providers: [BeverageService],
  exports: [BeverageService],
})
export class BeverageModule {}