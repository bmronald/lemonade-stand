import { IsNotEmpty, IsUUID, IsNumber, Min } from 'class-validator';

export class CreatePriceLinkDto {
  @IsUUID()
  @IsNotEmpty()
  beverageTypeId: string;

  @IsUUID()
  @IsNotEmpty()
  beverageSizeId: string;

  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0)
  price: number;
}