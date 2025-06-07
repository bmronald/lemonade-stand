import { PartialType } from '@nestjs/mapped-types';
import { CreateBeverageSizeDto } from './create-beverage-size.dto';

export class UpdateBeverageSizeDto extends PartialType(CreateBeverageSizeDto) {}