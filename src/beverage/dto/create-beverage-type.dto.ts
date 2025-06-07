import { IsNotEmpty, IsString } from 'class-validator';

export class CreateBeverageTypeDto {
  @IsString()
  @IsNotEmpty()
  name: string;
}