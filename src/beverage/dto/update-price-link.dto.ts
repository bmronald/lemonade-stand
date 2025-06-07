import { PartialType } from '@nestjs/mapped-types';
import { CreatePriceLinkDto } from './create-price-link.dto';

export class UpdatePriceLinkDto extends PartialType(CreatePriceLinkDto) {}
