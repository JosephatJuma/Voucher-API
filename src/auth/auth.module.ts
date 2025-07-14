import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PrismaService } from '../prisma/prisma.service';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtTokenService } from './jwt.service';
import { JwtStrategy } from './jwt.stategy';
@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: process.env.APP_SECRET,
      signOptions: { expiresIn: '1d' },
    }),
  ],

  providers: [
    AuthService,
    PrismaService,
    JwtTokenService,
    JwtService,
    JwtStrategy,
  ],
  controllers: [AuthController],
})
export class AuthModule {}
