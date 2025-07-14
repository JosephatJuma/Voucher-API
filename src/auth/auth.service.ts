import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UserDto } from './dto/user.dto';
import * as bcrypt from 'bcrypt';
import { JwtTokenService } from './jwt.service';
@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtTokenService,
  ) {}
  async createUserAccount(dto: UserDto) {
    const userExists = await this.prisma.user.findUnique({
      where: { username: dto.username },
    });
    if (userExists) {
      return new ConflictException('User already exists');
    }
    const hashedPassword = await bcrypt.hash(dto.password, 10);
    const user = await this.prisma.user.create({
      data: {
        username: dto.username,
        password: hashedPassword,
      },
    });
    return {
      message: 'User created successfully',
      user: { username: user.username, id: user.id },
    };
  }

  async login(user: UserDto) {
    const userExists = await this.prisma.user.findUnique({
      where: { username: user.username },
    });
    if (!userExists) {
      return new BadRequestException('User does not exist');
    }
    const isPasswordCorrect = await bcrypt.compare(
      user.password,
      userExists.password,
    );
    if (!isPasswordCorrect) {
      return new NotFoundException('Password is incorrect');
    }
    const tokens = await this.jwt.signTokens(
      userExists.id,
      userExists.username,
      userExists.password,
    );

    return {
      tokens,
      message: 'Login successful',
      user: { username: userExists.username, id: userExists.id },
    };
  }
}
