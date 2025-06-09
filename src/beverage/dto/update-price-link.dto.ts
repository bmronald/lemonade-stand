import { PartialType } from '@nestjs/mapped-types';
import { CreatePriceLinkDto } from './create-price-link.dto';

/**
 * DTO for updating an existing price link.
 * All fields (typeId, sizeId, price) are optional; only provided fields will be applied.
 */
export class UpdatePriceLinkDto extends PartialType(CreatePriceLinkDto) {}