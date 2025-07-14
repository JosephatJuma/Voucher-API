// src/auth/dto/register-user.dto.ts
import { IsEnum, IsOptional, IsString, MinLength } from 'class-validator';
import { Role } from '../../../generated/prisma';

export class UserDto {
  @IsString()
  username: string;

  @IsString()
  @MinLength(6)
  password: string;

  @IsOptional()
  @IsEnum(Role, { message: 'Role must be ADMIN, USER or VENDOR' })
  role: Role;
}
