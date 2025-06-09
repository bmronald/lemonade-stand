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
import { ApiTags, ApiResponse } from '@nestjs/swagger';

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

@ApiTags('beverage')
@Controller('beverage')
export class BeverageController {
  constructor(private readonly beverageService: BeverageService) {}

  // -------------------- Beverage Types --------------------

  /**
   * Create a new Beverage Type.
   * @param createBeverageTypeDto DTO containing the name of the beverage type.
   * @returns The created BeverageType entity.
   * @throws BadRequestException if the name is missing or already exists.
   */
  @Post('types')
  @HttpCode(HttpStatus.CREATED)
  @ApiResponse({ status: HttpStatus.CREATED, description: 'Beverage type created.' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Invalid input or duplicate name.' })
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
  @HttpCode(HttpStatus.OK)
  @ApiResponse({ status: HttpStatus.OK, description: 'List of beverage types.' })
  async findAllBeverageTypes(): Promise<BeverageType[]> {
    return this.beverageService.findAllBeverageTypes();
  }

  /**
   * Get a single Beverage Type by ID.
   * @param id UUID of the beverage type.
   * @returns The requested BeverageType entity.
   * @throws NotFoundException if no type with the given ID exists.
   */
  @Get('types/:id')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({ status: HttpStatus.OK, description: 'Beverage type retrieved.' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Invalid UUID format.' })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Beverage type not found.' })
  async findOneBeverageType(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ): Promise<BeverageType> {
    return this.beverageService.findOneBeverageType(id);
  }

  /**
   * Update an existing Beverage Type's name.
   * @param id UUID of the beverage type.
   * @param updateBeverageTypeDto DTO containing the new name.
   * @returns The updated BeverageType entity.
   * @throws BadRequestException for invalid input or duplicate name.
   * @throws NotFoundException if no type with the given ID exists.
   */
  @Patch('types/:id')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({ status: HttpStatus.OK, description: 'Beverage type updated.' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Invalid input or duplicate name.' })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Beverage type not found.' })
  async updateBeverageType(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Body() updateBeverageTypeDto: UpdateBeverageTypeDto,
  ): Promise<BeverageType> {
    return this.beverageService.updateBeverageType(id, updateBeverageTypeDto);
  }

  /**
   * Delete a Beverage Type (cascades to price links).
   * @param id UUID of the beverage type.
   * @throws NotFoundException if no type with the given ID exists.
   */
  @Delete('types/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiResponse({ status: HttpStatus.NO_CONTENT, description: 'Beverage type deleted.' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Invalid UUID format.' })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Beverage type not found.' })
  async removeBeverageType(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ): Promise<void> {
    return this.beverageService.removeBeverageType(id);
  }

  // -------------------- Beverage Sizes --------------------

  /**
   * Create a new Beverage Size.
   * @param createBeverageSizeDto DTO containing the name of the size.
   * @returns The created BeverageSize entity.
   * @throws BadRequestException if the name is missing or already exists.
   */
  @Post('sizes')
  @HttpCode(HttpStatus.CREATED)
  @ApiResponse({ status: HttpStatus.CREATED, description: 'Beverage size created.' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Invalid input or duplicate name.' })
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
  @HttpCode(HttpStatus.OK)
  @ApiResponse({ status: HttpStatus.OK, description: 'List of beverage sizes.' })
  async findAllBeverageSizes(): Promise<BeverageSize[]> {
    return this.beverageService.findAllBeverageSizes();
  }

  /**
   * Get a single Beverage Size by ID.
   * @param id UUID of the beverage size.
   * @returns The requested BeverageSize entity.
   * @throws NotFoundException if no size with the given ID exists.
   */
  @Get('sizes/:id')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({ status: HttpStatus.OK, description: 'Beverage size retrieved.' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Invalid UUID format.' })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Beverage size not found.' })
  async findOneBeverageSize(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ): Promise<BeverageSize> {
    return this.beverageService.findOneBeverageSize(id);
  }

  /**
   * Update an existing Beverage Size's name.
   * @param id UUID of the beverage size.
   * @param updateBeverageSizeDto DTO containing the new name.
   * @returns The updated BeverageSize entity.
   * @throws BadRequestException for invalid input or duplicate name.
   * @throws NotFoundException if no size with the given ID exists.
   */
  @Patch('sizes/:id')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({ status: HttpStatus.OK, description: 'Beverage size updated.' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Invalid input or duplicate name.' })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Beverage size not found.' })
  async updateBeverageSize(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Body() updateBeverageSizeDto: UpdateBeverageSizeDto,
  ): Promise<BeverageSize> {
    return this.beverageService.updateBeverageSize(id, updateBeverageSizeDto);
  }

  /**
   * Delete a Beverage Size (cascades to price links).
   * @param id UUID of the beverage size.
   * @throws NotFoundException if no size with the given ID exists.
   */
  @Delete('sizes/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiResponse({ status: HttpStatus.NO_CONTENT, description: 'Beverage size deleted.' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Invalid UUID format.' })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Beverage size not found.' })
  async removeBeverageSize(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ): Promise<void> {
    return this.beverageService.removeBeverageSize(id);
  }

  // -------------------- Price Links --------------------

  /**
   * Create a new Price Link for a beverage type and size.
   * @param createPriceLinkDto DTO containing type ID, size ID, and price.
   * @returns The created PriceLink entity.
   * @throws BadRequestException for invalid input or duplicate link.
   * @throws NotFoundException if referenced type or size does not exist.
   */
  @Post('prices')
  @HttpCode(HttpStatus.CREATED)
  @ApiResponse({ status: HttpStatus.CREATED, description: 'Price link created.' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Invalid input or duplicate link.' })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Referenced type or size not found.' })
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
  @HttpCode(HttpStatus.OK)
  @ApiResponse({ status: HttpStatus.OK, description: 'List of price links.' })
  async findAllPriceLinks(): Promise<PriceLink[]> {
    return this.beverageService.findAllPriceLinks();
  }

  /**
   * Get a single Price Link by ID.
   * @param id UUID of the price link.
   * @returns The requested PriceLink entity.
   * @throws NotFoundException if no link with the given ID exists.
   */
  @Get('prices/:id')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({ status: HttpStatus.OK, description: 'Price link retrieved.' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Invalid UUID format.' })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Price link not found.' })
  async findOnePriceLink(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ): Promise<PriceLink> {
    return this.beverageService.findOnePriceLink(id);
  }

  /**
   * Update an existing Price Link (type, size, or price).
   * @param id UUID of the price link.
   * @param updatePriceLinkDto DTO containing new fields.
   * @returns The updated PriceLink entity.
   * @throws BadRequestException for invalid input or duplicate link.
   * @throws NotFoundException if no link with the given ID exists.
   */
  @Patch('prices/:id')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({ status: HttpStatus.OK, description: 'Price link updated.' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Invalid input or duplicate link.' })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Price link not found.' })
  async updatePriceLink(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Body() updatePriceLinkDto: UpdatePriceLinkDto,
  ): Promise<PriceLink> {
    return this.beverageService.updatePriceLink(id, updatePriceLinkDto);
  }

  /**
   * Delete a Price Link.
   * @param id UUID of the price link.
   * @throws NotFoundException if no link with the given ID exists.
   */
  @Delete('prices/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiResponse({ status: HttpStatus.NO_CONTENT, description: 'Price link deleted.' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Invalid UUID format.' })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Price link not found.' })
  async removePriceLink(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ): Promise<void> {
    return this.beverageService.removePriceLink(id);
  }
}
