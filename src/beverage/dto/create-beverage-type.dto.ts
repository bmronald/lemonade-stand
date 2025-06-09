import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

/**
 * DTO for creating a new beverage type.
 */
export class CreateBeverageTypeDto {
  @ApiProperty({
    description: 'Name of the beverage type',
    example: 'Classic Lemonade',
  })
  @IsString()
  @IsNotEmpty()
  name: string;
}
