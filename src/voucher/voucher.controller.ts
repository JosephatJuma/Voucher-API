import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { VoucherService } from './voucher.service';
import {
  ApiBearerAuth,
  ApiBody,
  ApiResponse,
  ApiTags,
  ApiOperation,
} from '@nestjs/swagger';
import {
  VoucherCreationDto,
  VoucherRedeemDto,
  VoucherUpdateDto,
} from './dto/voucher.dto';
import { AuthGuard } from '@nestjs/passport';
import { VoucherType } from '../../generated/prisma';
import { RolesGuard } from '../auth/guards/roles.guard';
@Controller('voucher')
@UseGuards(AuthGuard('jwt'))
@ApiTags('Voucher')
@ApiBearerAuth()
export class VoucherController {
  constructor(private voucherService: VoucherService) {}
  @Post()
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        code: {
          type: 'string',
          description: 'Voucher code',
          example: '123456',
        },
        value: {
          type: 'number',
          description:
            'Voucher duration in minutes or megabytes, depending on system/voucher type',
          example: 1000000,
        },
        notes: {
          type: 'string',
          description: 'Voucher notes',
          example: 'lorem ipsum',
        },
        createdById: {
          type: 'uuid',
          description: 'id of the user who created the voucher',
          example: '1a2b3c4d-5e6f-7g8h-9i0j-1k2l3m4n5o6p',
        },
        type: {
          type: 'string',
          description: 'Voucher type',
          example: VoucherType.TIME,
        },
      },
    },
  })
  @UseGuards(RolesGuard(['ADMIN', 'VENDOR']))
  createVoucher(@Body() data: VoucherCreationDto) {
    return this.voucherService.createVoucher(data);
  }
  @Get()
  @ApiResponse({ status: 200, description: 'List of all vouchers' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  getVouchers() {
    return this.voucherService.getVouchers();
  }
  @Get(':id')
  @ApiResponse({ status: 200, description: 'Voucher found' })
  @ApiResponse({ status: 404, description: 'Voucher not found' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  getVoucher(@Body() id: string) {
    return this.voucherService.getVoucher(id);
  }

  @Put(':id')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        code: {
          type: 'string',
          description: 'Voucher code',
          example: '123456',
        },
        value: {
          type: 'number',
          description:
            'Voucher duration in minutes or megabytes, depending on system/voucher type',
          example: 1000000,
        },
        note: {
          type: 'string',
          description: 'Voucher notes',
          example: 'lorem ipsum',
        },
        updatedById: {
          type: 'uuid',
          description: 'id of the user who updated the voucher',
          example: '1a2b3c4d-5e6f-7g8h-9i0j-1k2l3m4n5o6p',
        },
      },
    },
  })
  @ApiOperation({
    description: 'Update a voucher, only admin can update a voucher',
  })
  @ApiResponse({ status: 200, description: 'Voucher updated successfully' })
  @ApiResponse({ status: 404, description: 'Voucher not found' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  @UseGuards(RolesGuard(['ADMIN']))
  updateVoucher(@Body() data: VoucherUpdateDto, @Param('id') id: string) {
    return this.voucherService.updateVoucher(data, id);
  }

  @Delete(':id')
  @ApiOperation({
    description: 'Delete a voucher, only admin can delete a voucher',
  })
  @ApiResponse({ status: 200, description: 'Voucher deleted successfully' })
  @ApiResponse({ status: 404, description: 'Voucher not found' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  @UseGuards(RolesGuard(['ADMIN']))
  deleteVoucher(@Body() id: string) {
    return this.voucherService.deleteVoucher(id);
  }

  @Patch(':id/revoke')
  @ApiOperation({
    description: 'Revoke a voucher, only admin can revoke a voucher',
  })
  @ApiResponse({ status: 200, description: 'Voucher revoked successfully' })
  @ApiResponse({ status: 404, description: 'Voucher not found' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  @UseGuards(RolesGuard(['ADMIN']))
  revokeVoucher(@Body() id: string) {
    return this.voucherService.revokeVoucher(id);
  }

  @Patch(':id/redeem')
  @ApiOperation({
    description: 'Redeem a voucher, only user can redeem a voucher',
  })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        voucherId: { type: 'string' },
        userId: { type: 'string' },
      },
    },
  })
  @ApiResponse({ status: 200, description: 'Voucher redeemed successfully' })
  @ApiResponse({ status: 404, description: 'Voucher or user not found' })
  @ApiResponse({ status: 409, description: 'Voucher already redeemed' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  @UseGuards(RolesGuard(['USER']))
  redeemVoucher(@Body() data: VoucherRedeemDto) {
    return this.voucherService.redeemVoucher(data);
  }
}
