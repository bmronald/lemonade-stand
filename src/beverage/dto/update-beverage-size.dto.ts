import { PartialType } from '@nestjs/mapped-types';
import { CreateBeverageSizeDto } from './create-beverage-size.dto';

/**
 * DTO for updating an existing beverage size.
 * All fields are optional; only those present will be updated.
 */
export class UpdateBeverageSizeDto extends PartialType(CreateBeverageSizeDto) {}
