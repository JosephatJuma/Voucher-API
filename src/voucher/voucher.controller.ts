import { Body, Controller, Post } from '@nestjs/common';
import { VoucherService } from './voucher.service';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { VoucherCreationDto } from './dto/voucher.dto';

@Controller('voucher')
@ApiTags('Voucher')
export class VoucherController {
  constructor(private voucherService: VoucherService) {}
  @Post()
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        code: { type: 'string' },
        value: { type: 'number' },
      },
    },
  })
  createVoucher(@Body() data: VoucherCreationDto) {
    return this.voucherService.createVoucher(data);
  }
}
