import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { VoucherCreationDto } from './dto/voucher.dto';
@Injectable()
export class VoucherService {
  constructor(private prisma: PrismaService) {}

  async createVoucher(dto: VoucherCreationDto) {
    const voucher = await this.prisma.voucher.create({ data: dto });
    return {
      message: 'Voucher created successfully',
      voucher,
    };
  }
}
