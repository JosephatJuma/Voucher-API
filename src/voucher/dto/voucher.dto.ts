import {
  IsString,
  IsNotEmpty,
  IsNumber,
  IsEnum,
  IsOptional,
} from 'class-validator';
import { VoucherType } from '../../../generated/prisma';

export class VoucherCreationDto {
  @IsString()
  @IsNotEmpty()
  code: string;

  @IsNumber()
  @IsNotEmpty()
  value: number;

  @IsString()
  @IsOptional()
  note: string;

  @IsString()
  @IsNotEmpty()
  createdById: string;

  @IsOptional()
  @IsEnum(VoucherType)
  type: VoucherType;
}

export class VoucherUpdateDto {
  @IsString()
  @IsNotEmpty()
  code: string;

  @IsNumber()
  @IsNotEmpty()
  value: number;

  @IsString()
  @IsOptional()
  note: string;

  @IsString()
  @IsNotEmpty()
  updatedById: string;

  @IsOptional()
  @IsEnum(VoucherType)
  type: VoucherType;
}

export class VoucherRedeemDto {
  @IsString()
  @IsNotEmpty()
  voucherId: string;

  @IsString()
  @IsNotEmpty()
  userId: string;
}
