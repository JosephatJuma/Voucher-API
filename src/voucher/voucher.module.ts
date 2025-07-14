import { Module } from '@nestjs/common';
import { VoucherService } from './voucher.service';
import { PrismaService } from '../prisma/prisma.service';
import { VoucherController } from './voucher.controller';

@Module({
  providers: [VoucherService, PrismaService],
  controllers: [VoucherController],
})
export class VoucherModule {}
