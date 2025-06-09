import { ApiProperty } from '@nestjs/swagger';
import { IsUUID, IsInt, Min } from 'class-validator';

/**
 * DTO representing a single line item in an order:
 * the selected beverage type/size and the quantity desired.
 */
export class CreateOrderItemDto {
  @ApiProperty({
    description: 'UUID of the beverage type',
    example: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
    format: 'uuid',
  })
  @IsUUID()
  beverageTypeId: string;

  @ApiProperty({
    description: 'UUID of the beverage size',
    example: '4fa85f64-5717-4562-b3fc-2c963f66afb7',
    format: 'uuid',
  })
  @IsUUID()
  beverageSizeId: string;

  @ApiProperty({
    description: 'Quantity of this beverage to order',
    example: 2,
    minimum: 1,
  })
  @IsInt()
  @Min(1)
  quantity: number;
}
