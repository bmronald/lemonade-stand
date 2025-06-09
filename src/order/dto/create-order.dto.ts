import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsString,
  IsArray,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { CreateOrderItemDto } from './create-order-item.dto';

/**
 * DTO for placing a new order.
 * Contains customer information and a list of order items.
 */
export class CreateOrderDto {
  @ApiProperty({
    description: "Customer's full name",
    example: 'Alice Johnson',
  })
  @IsString()
  @IsNotEmpty()
  customerName: string;

  @ApiProperty({
    description: "Customer's contact (phone number or email address)",
    example: 'alice@example.com',
  })
  @IsString()
  @IsNotEmpty()
  customerContact: string;

  @ApiProperty({
    description: 'Array of items to include in the order',
    type: [CreateOrderItemDto],
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateOrderItemDto)
  items: CreateOrderItemDto[];
}