import { IsString, IsNotEmpty, IsNumber } from 'class-validator';

export class VoucherCreationDto {
  @IsString()
  @IsNotEmpty()
  code: string;

  @IsNumber()
  @IsNotEmpty()
  value: number;
}
