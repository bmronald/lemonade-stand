import { PartialType } from '@nestjs/mapped-types';
import { CreateBeverageTypeDto } from './create-beverage-type.dto';

export class UpdateBeverageTypeDto extends PartialType(CreateBeverageTypeDto) {}