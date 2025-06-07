/**
 * Service to manage beverage types, sizes, and their pricing links.
 * Handles CRUD operations and enforces business rules.
 */
import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { BeverageType } from './entities/beverage-type.entity';
import { BeverageSize } from './entities/beverage-size.entity';
import { PriceLink } from './entities/price-link.entity';

import { CreateBeverageTypeDto } from './dto/create-beverage-type.dto';
import { UpdateBeverageTypeDto } from './dto/update-beverage-type.dto';
import { CreateBeverageSizeDto } from './dto/create-beverage-size.dto';
import { UpdateBeverageSizeDto } from './dto/update-beverage-size.dto';
import { CreatePriceLinkDto } from './dto/create-price-link.dto';
import { UpdatePriceLinkDto } from './dto/update-price-link.dto';

@Injectable()
export class BeverageService {
  constructor(
    @InjectRepository(BeverageType)
    private readonly beverageTypeRepository: Repository<BeverageType>,

    @InjectRepository(BeverageSize)
    private readonly beverageSizeRepository: Repository<BeverageSize>,

    @InjectRepository(PriceLink)
    private readonly priceLinkRepository: Repository<PriceLink>,
  ) {}

  // -----------------------------------
  // Beverage Type CRUD
  // -----------------------------------

  /**
   * Create a new beverage type.
   * @param dto DTO containing the 'name' field
   * @returns the created BeverageType
   * @throws BadRequestException if name already used
   */
  public async createBeverageType(
    dto: CreateBeverageTypeDto,
  ): Promise<BeverageType> {
    await this.ensureUniqueTypeName(dto.name);
    const beverageType = this.beverageTypeRepository.create({ name: dto.name });
    return this.beverageTypeRepository.save(beverageType);
  }

  /**
   * List all beverage types, including their price links.
   * @returns array of BeverageType
   */
  public async findAllBeverageTypes(): Promise<BeverageType[]> {
    return this.beverageTypeRepository.find({ relations: ['priceLinks'] });
  }

  /**
   * Retrieve a beverage type by ID.
   * @param id UUID of the beverage type
   * @returns BeverageType with related price links
   * @throws NotFoundException if not found
   */
  public async findOneBeverageType(id: string): Promise<BeverageType> {
    const beverageType = await this.beverageTypeRepository.findOne({
      where: { id },
      relations: ['priceLinks'],
    });
    if (!beverageType) {
      throw new NotFoundException(`BeverageType with id='${id}' not found`);
    }
    return beverageType;
  }

  /**
   * Update an existing beverage type's name.
   * @param id UUID of the beverage type
   * @param dto DTO containing updated name
   * @returns the updated BeverageType
   * @throws NotFoundException if type not found
   * @throws BadRequestException if new name is already in use
   */
  public async updateBeverageType(
    id: string,
    dto: UpdateBeverageTypeDto,
  ): Promise<BeverageType> {
    const beverageType = await this.findOneBeverageType(id);
    if (dto.name && dto.name !== beverageType.name) {
      await this.ensureUniqueTypeName(dto.name, id);
      beverageType.name = dto.name;
    }
    return this.beverageTypeRepository.save(beverageType);
  }

  /**
   * Delete a beverage type and cascade to price links.
   * @param id UUID of the beverage type
   * @throws NotFoundException if type not found
   */
  public async removeBeverageType(id: string): Promise<void> {
    const beverageType = await this.findOneBeverageType(id);
    await this.beverageTypeRepository.remove(beverageType);
  }

  // -----------------------------------
  // Beverage Size CRUD
  // -----------------------------------

  /**
   * Create a new beverage size.
   * @param dto DTO containing the 'name' field
   * @returns the created BeverageSize
   * @throws BadRequestException if name already used
   */
  public async createBeverageSize(
    dto: CreateBeverageSizeDto,
  ): Promise<BeverageSize> {
    await this.ensureUniqueSizeName(dto.name);
    const beverageSize = this.beverageSizeRepository.create({ name: dto.name });
    return this.beverageSizeRepository.save(beverageSize);
  }

  /**
   * List all beverage sizes, including their price links.
   * @returns array of BeverageSize
   */
  public async findAllBeverageSizes(): Promise<BeverageSize[]> {
    return this.beverageSizeRepository.find({ relations: ['priceLinks'] });
  }

  /**
   * Retrieve a beverage size by ID.
   * @param id UUID of the beverage size
   * @returns BeverageSize with related price links
   * @throws NotFoundException if not found
   */
  public async findOneBeverageSize(id: string): Promise<BeverageSize> {
    const beverageSize = await this.beverageSizeRepository.findOne({
      where: { id },
      relations: ['priceLinks'],
    });
    if (!beverageSize) {
      throw new NotFoundException(`BeverageSize with id='${id}' not found`);
    }
    return beverageSize;
  }

  /**
   * Update a beverage size's name.
   * @param id UUID of the beverage size
   * @param dto DTO containing updated name
   * @returns the updated BeverageSize
   * @throws NotFoundException if size not found
   * @throws BadRequestException if new name is already used
   */
  public async updateBeverageSize(
    id: string,
    dto: UpdateBeverageSizeDto,
  ): Promise<BeverageSize> {
    const beverageSize = await this.findOneBeverageSize(id);
    if (dto.name && dto.name !== beverageSize.name) {
      await this.ensureUniqueSizeName(dto.name, id);
      beverageSize.name = dto.name;
    }
    return this.beverageSizeRepository.save(beverageSize);
  }

  /**
   * Delete a beverage size and cascade to price links.
   * @param id UUID of the beverage size
   * @throws NotFoundException if size not found
   */
  public async removeBeverageSize(id: string): Promise<void> {
    const beverageSize = await this.findOneBeverageSize(id);
    await this.beverageSizeRepository.remove(beverageSize);
  }

  // -----------------------------------
  // Price Link CRUD
  // -----------------------------------

  /**
   * Create a price link for a given beverage type and size.
   * @param dto DTO containing typeId, sizeId, and price
   * @returns the created PriceLink
   * @throws NotFoundException if type or size not found
   * @throws BadRequestException if link already exists
   */
  public async createPriceLink(
    dto: CreatePriceLinkDto,
  ): Promise<PriceLink> {
    const beverageType = await this.findOneBeverageType(dto.beverageTypeId);
    const beverageSize = await this.findOneBeverageSize(dto.beverageSizeId);
    await this.ensureUniquePriceLink(dto.beverageTypeId, dto.beverageSizeId);

    const priceLink = this.priceLinkRepository.create({
      beverageType,
      beverageSize,
      price: dto.price,
    });
    return this.priceLinkRepository.save(priceLink);
  }

  /**
   * List all price links with type and size details.
   * @returns array of PriceLink
   */
  public async findAllPriceLinks(): Promise<PriceLink[]> {
    return this.priceLinkRepository.find({ relations: ['beverageType', 'beverageSize'] });
  }

  /**
   * Retrieve a price link by ID.
   * @param id UUID of the PriceLink
   * @returns the PriceLink
   * @throws NotFoundException if not found
   */
  public async findOnePriceLink(id: string): Promise<PriceLink> {
    const priceLink = await this.priceLinkRepository.findOne({
      where: { id },
      relations: ['beverageType', 'beverageSize'],
    });
    if (!priceLink) {
      throw new NotFoundException(`PriceLink with id='${id}' not found`);
    }
    return priceLink;
  }

  /**
   * Update a price link's properties.
   * @param id UUID of the PriceLink
   * @param dto DTO containing updated fields
   * @returns the updated PriceLink
   * @throws NotFoundException if not found
   * @throws BadRequestException if conflict detected
   */
  public async updatePriceLink(
    id: string,
    dto: UpdatePriceLinkDto,
  ): Promise<PriceLink> {
    const priceLink = await this.findOnePriceLink(id);

    if (dto.beverageTypeId && dto.beverageTypeId !== priceLink.beverageType.id) {
      priceLink.beverageType = await this.findOneBeverageType(dto.beverageTypeId);
    }
    if (dto.beverageSizeId && dto.beverageSizeId !== priceLink.beverageSize.id) {
      priceLink.beverageSize = await this.findOneBeverageSize(dto.beverageSizeId);
    }
    if (dto.price !== undefined) {
      priceLink.price = dto.price;
    }
    await this.ensureUniquePriceLink(
      priceLink.beverageType.id,
      priceLink.beverageSize.id,
      id,
    );
    return this.priceLinkRepository.save(priceLink);
  }

  /**
   * Delete a price link.
   * @param id UUID of the PriceLink
   * @throws NotFoundException if not found
   */
  public async removePriceLink(id: string): Promise<void> {
    const priceLink = await this.findOnePriceLink(id);
    await this.priceLinkRepository.remove(priceLink);
  }

  // -----------------------------------
  // Public helper for OrderService
  // -----------------------------------

  /**
   * Find a price link by type and size IDs for order calculations.
   * @param beverageTypeId UUID of BeverageType
   * @param beverageSizeId UUID of BeverageSize
   * @returns PriceLink or null if none exists
   */
  public async findPriceLinkByTypeAndSize(
    beverageTypeId: string,
    beverageSizeId: string,
  ): Promise<PriceLink | null> {
    return this.priceLinkRepository.findOne({
      where: {
        beverageType: { id: beverageTypeId },
        beverageSize: { id: beverageSizeId },
      },
      relations: ['beverageType', 'beverageSize'],
    });
  }

  // -----------------------------------
  // Private helper methods
  // -----------------------------------

  /**
   * Ensure beverage type name is unique, excluding optionally one ID.
   */
  private async ensureUniqueTypeName(
    name: string,
    excludeId?: string,
  ): Promise<void> {
    const existing = await this.beverageTypeRepository.findOne({ where: { name } });
    if (existing && existing.id !== excludeId) {
      throw new BadRequestException(
        `Beverage type name='${name}' is already in use`,
      );
    }
  }

  /**
   * Ensure beverage size name is unique, excluding optionally one ID.
   */
  private async ensureUniqueSizeName(
    name: string,
    excludeId?: string,
  ): Promise<void> {
    const existing = await this.beverageSizeRepository.findOne({ where: { name } });
    if (existing && existing.id !== excludeId) {
      throw new BadRequestException(
        `Beverage size name='${name}' is already in use`,
      );
    }
  }

  /**
   * Ensure only one price link exists for a given type/size combo.
   */
  private async ensureUniquePriceLink(
    typeId: string,
    sizeId: string,
    excludeId?: string,
  ): Promise<void> {
    const existing = await this.priceLinkRepository.findOne({
      where: { beverageType: { id: typeId }, beverageSize: { id: sizeId } },
    });
    if (existing && existing.id !== excludeId) {
      throw new BadRequestException(
        `PriceLink for type='${typeId}', size='${sizeId}' already exists`,
      );
    }
  }
}
