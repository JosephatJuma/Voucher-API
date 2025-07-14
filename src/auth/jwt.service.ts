import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';
import * as process from 'node:process';

@Injectable()
export class JwtTokenService {
  constructor(
    private jwt: JwtService,
    private prisma: PrismaService,
  ) {}
  async signTokens(userId: string, email: string, password: string) {
    const [at, rt] = await Promise.all([
      this.jwt.signAsync(
        {
          userId,
          email,
          password,
        },
        {
          secret: process.env.APP_SECRET,
          expiresIn: '100d',
        },
      ),
      this.jwt.signAsync(
        {
          userId,
          email,
          password,
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
