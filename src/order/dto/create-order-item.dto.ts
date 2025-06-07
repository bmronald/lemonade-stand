import { IsUUID, IsInt, Min } from 'class-validator';

export class CreateOrderItemDto {
  @IsUUID()
  beverageTypeId: string;

  @IsUUID()
  beverageSizeId: string;

  @IsInt()
  @Min(1)
  quantity: number;
}