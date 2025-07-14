import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as process from 'node:process';
import { Role } from '../../generated/prisma';

@Injectable()
export class JwtTokenService {
  constructor(private jwt: JwtService) {}
  async signTokens(userId: string, username: string, role: Role) {
    const [at, rt] = await Promise.all([
      this.jwt.signAsync(
        {
          userId,
          username,
          role,
        },
        {
          secret: process.env.APP_SECRET,
          expiresIn: '100d',
        },
      ),
      this.jwt.signAsync(
        {
          userId,
          username,
          role,
        },
        {
          secret: process.env.APP_SECRET,
          expiresIn: '100d',
        },
      ),
    ]);

    return {
      access_token: at,
      refresh_token: rt,
    };
  }
}
