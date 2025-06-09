import { PartialType } from '@nestjs/mapped-types';
import { CreateBeverageTypeDto } from './create-beverage-type.dto';

/**
 * DTO for updating an existing beverage type.
 * All fields are optional; only those present will be updated.
 */
export class UpdateBeverageTypeDto extends PartialType(CreateBeverageTypeDto) {}
