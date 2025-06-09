import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

/**
 * DTO for creating a new beverage size.
 */
export class CreateBeverageSizeDto {
  @ApiProperty({
    description: 'Name of the beverage size',
    example: 'Small',
  })
  @IsString()
  @IsNotEmpty()
  name: string;
}
