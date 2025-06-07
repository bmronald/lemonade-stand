import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
  HttpCode,
  HttpStatus,
  ParseUUIDPipe,
} from '@nestjs/common';

import { BeverageService } from './beverage.service';
import { CreateBeverageTypeDto } from './dto/create-beverage-type.dto';
import { UpdateBeverageTypeDto } from './dto/update-beverage-type.dto';
import { CreateBeverageSizeDto } from './dto/create-beverage-size.dto';
import { UpdateBeverageSizeDto } from './dto/update-beverage-size.dto';
import { CreatePriceLinkDto } from './dto/create-price-link.dto';
import { UpdatePriceLinkDto } from './dto/update-price-link.dto';
import { BeverageType } from './entities/beverage-type.entity';
import { BeverageSize } from './entities/beverage-size.entity';
import { PriceLink } from './entities/price-link.entity';

/**
 * Controller for managing beverages: types, sizes, and price links.
 */
@Controller('beverage')
export class BeverageController {
  constructor(private readonly beverageService: BeverageService) {}

  // -------------------- Beverage Types --------------------

  /**
   * Create a new Beverage Type.
   * @param createBeverageTypeDto DTO containing the name of the beverage type.
   * @returns The created BeverageType entity.
   */
  @Post('types')
  async createBeverageType(
    @Body() createBeverageTypeDto: CreateBeverageTypeDto,
  ): Promise<BeverageType> {
    return this.beverageService.createBeverageType(createBeverageTypeDto);
  }

  /**
   * Get all Beverage Types with their price links.
   * @returns Array of BeverageType entities.
   */
  @Get('types')
  async findAllBeverageTypes(): Promise<BeverageType[]> {
    return this.beverageService.findAllBeverageTypes();
  }

  /**
   * Get a single Beverage Type by ID.
   * @param id UUID of the beverage type.
   * @returns The requested BeverageType entity.
   */
  @Get('types/:id')
  async findOneBeverageType(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<BeverageType> {
    return this.beverageService.findOneBeverageType(id);
  }

  /**
   * Update an existing Beverage Type's name.
   * @param id UUID of the beverage type.
   * @param updateBeverageTypeDto DTO containing the new name.
   * @returns The updated BeverageType entity.
   */
  @Patch('types/:id')
  async updateBeverageType(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateBeverageTypeDto: UpdateBeverageTypeDto,
  ): Promise<BeverageType> {
    return this.beverageService.updateBeverageType(id, updateBeverageTypeDto);
  }

  /**
   * Delete a Beverage Type (cascades to price links).
   * @param id UUID of the beverage type.
   * @returns void indicating successful deletion.
   */
  @Delete('types/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async removeBeverageType(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<void> {
    return this.beverageService.removeBeverageType(id);
  }

  // -------------------- Beverage Sizes --------------------

  /**
   * Create a new Beverage Size.
   * @param createBeverageSizeDto DTO containing the name of the size.
   * @returns The created BeverageSize entity.
   */
  @Post('sizes')
  async createBeverageSize(
    @Body() createBeverageSizeDto: CreateBeverageSizeDto,
  ): Promise<BeverageSize> {
    return this.beverageService.createBeverageSize(createBeverageSizeDto);
  }

  /**
   * Get all Beverage Sizes with their price links.
   * @returns Array of BeverageSize entities.
   */
  @Get('sizes')
  async findAllBeverageSizes(): Promise<BeverageSize[]> {
    return this.beverageService.findAllBeverageSizes();
  }

  /**
   * Get a single Beverage Size by ID.
   * @param id UUID of the beverage size.
   * @returns The requested BeverageSize entity.
   */
  @Get('sizes/:id')
  async findOneBeverageSize(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<BeverageSize> {
    return this.beverageService.findOneBeverageSize(id);
  }

  /**
   * Update an existing Beverage Size's name.
   * @param id UUID of the beverage size.
   * @param updateBeverageSizeDto DTO containing the new name.
   * @returns The updated BeverageSize entity.
   */
  @Patch('sizes/:id')
  async updateBeverageSize(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateBeverageSizeDto: UpdateBeverageSizeDto,
  ): Promise<BeverageSize> {
    return this.beverageService.updateBeverageSize(id, updateBeverageSizeDto);
  }

  /**
   * Delete a Beverage Size (cascades to price links).
   * @param id UUID of the beverage size.
   * @returns void indicating successful deletion.
   */
  @Delete('sizes/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async removeBeverageSize(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<void> {
    return this.beverageService.removeBeverageSize(id);
  }

  // -------------------- Price Links --------------------

  /**
   * Create a new Price Link for a beverage type and size.
   * @param createPriceLinkDto DTO containing type ID, size ID, and price.
   * @returns The created PriceLink entity.
   */
  @Post('prices')
  async createPriceLink(
    @Body() createPriceLinkDto: CreatePriceLinkDto,
  ): Promise<PriceLink> {
    return this.beverageService.createPriceLink(createPriceLinkDto);
  }

  /**
   * Get all Price Links.
   * @returns Array of PriceLink entities.
   */
  @Get('prices')
  async findAllPriceLinks(): Promise<PriceLink[]> {
    return this.beverageService.findAllPriceLinks();
  }

  /**
   * Get a single Price Link by ID.
   * @param id UUID of the price link.
   * @returns The requested PriceLink entity.
   */
  @Get('prices/:id')
  async findOnePriceLink(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<PriceLink> {
    return this.beverageService.findOnePriceLink(id);
  }

  /**
   * Update an existing Price Link (type, size, or price).
   * @param id UUID of the price link.
   * @param updatePriceLinkDto DTO containing new fields.
   * @returns The updated PriceLink entity.
   */
  @Patch('prices/:id')
  async updatePriceLink(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updatePriceLinkDto: UpdatePriceLinkDto,
  ): Promise<PriceLink> {
    return this.beverageService.updatePriceLink(id, updatePriceLinkDto);
  }

  /**
   * Delete a Price Link.
   * @param id UUID of the price link.
   * @returns void indicating successful deletion.
   */
  @Delete('prices/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async removePriceLink(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<void> {
    return this.beverageService.removePriceLink(id);
  }
}
