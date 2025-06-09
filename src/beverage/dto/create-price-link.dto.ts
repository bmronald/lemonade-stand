import { ApiProperty } from '@nestjs/swagger';
import { IsUUID, IsNotEmpty, IsNumber, Min } from 'class-validator';

/**
 * DTO for creating a price link between a beverage type and size.
 */
export class CreatePriceLinkDto {
  @ApiProperty({
    description: 'UUID of the beverage type',
    example: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
    format: 'uuid',
  })
  @IsUUID()
  @IsNotEmpty()
  beverageTypeId: string;

  @ApiProperty({
    description: 'UUID of the beverage size',
    example: '4fa85f64-5717-4562-b3fc-2c963f66afb7',
    format: 'uuid',
  })
  @IsUUID()
  @IsNotEmpty()
  beverageSizeId: string;

  @ApiProperty({
    description: 'Price for this type & size combination',
    example: 2.50,
    minimum: 0,
  })
  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0)
  price: number;
}
