import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import {
  VoucherCreationDto,
  VoucherRedeemDto,
  VoucherUpdateDto,
} from './dto/voucher.dto';
@Injectable()
export class VoucherService {
  constructor(private prisma: PrismaService) {}

  async createVoucher(dto: VoucherCreationDto) {
    const user = await this.prisma.user.findUnique({
      where: { id: dto.createdById, role: { in: ['ADMIN', 'VENDOR'] } },
    });
    if (!user) {
      return new UnauthorizedException(
        "You don't have permission to create a voucher",
      );
    }
    const voucherExists = await this.prisma.voucher.findUnique({
      where: { code: dto.code },
    });
    if (voucherExists) {
      return new ConflictException(`Voucher with "${dto.code}" already exists`);
    }

    const voucher = await this.prisma.voucher.create({ data: dto });
    return {
      message: 'Voucher created successfully',
      voucher,
    };
  }
  getVouchers() {
    return this.prisma.voucher.findMany({
      include: {
        redeemedBy: { select: { username: true, role: true, id: true } },
        createdBy: { select: { username: true, role: true, id: true } },
      },
    });
  }

  async getVoucher(id: string) {
    const voucher = await this.findVoucherById(id);
    if (!voucher) {
      return new NotFoundException("This voucher doesn't exist");
    }
    return voucher;
  }
  async updateVoucher(dto: VoucherUpdateDto, id: string) {
    await this.findVoucherById(id);
    return this.prisma.voucher.update({ where: { id }, data: dto });
  }
  async deleteVoucher(id: string) {
    await this.findVoucherById(id);
    return this.prisma.voucher.delete({ where: { id } });
  }
  async revokeVoucher(id: string) {
    await this.findVoucherById(id);
    return this.prisma.voucher.update({
      where: { id },
      data: {
        isRevoked: true,
      },
    });
  }

  async redeemVoucher(dto: VoucherRedeemDto) {
    await this.findVoucherById(dto.voucherId);
    await this.findUserById(dto.userId);
    return this.prisma.voucher.update({
      where: { id: dto.voucherId },
      data: {
        isRedeemed: true,
        redeemedById: dto.userId,
        status: 'REDEEMED',
        redeemedAt: new Date(),
      },
    });
  }

  private async findVoucherById(id: string) {
    const voucher = await this.prisma.voucher.findUnique({
      where: { id },
      include: {
        redeemedBy: { select: { username: true, role: true, id: true } },
        createdBy: { select: { username: true, role: true, id: true } },
      },
    });
    if (!voucher) {
      return new NotFoundException("This voucher doesn't exist");
    }
    return voucher;
  }

  private async findUserById(id: string) {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });
    if (!user) {
      return new NotFoundException("This user doesn't exist");
    }
    return user;
  }


  
}


