import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { VoucherModule } from './voucher/voucher.module';
import { PaymentModule } from './payment/payment.module';
import { SmsModule } from './sms/sms.module';
import { UsageModule } from './usage/usage.module';

@Module({
  imports: [
    PrismaModule,
    AuthModule,
    VoucherModule,
    PaymentModule,
    SmsModule,
    UsageModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
