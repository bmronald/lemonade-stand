import { IsNotEmpty, IsString } from 'class-validator';

export class CreateBeverageSizeDto {
  @IsString()
  @IsNotEmpty()
  name: string;
}