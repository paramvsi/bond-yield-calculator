import { Controller, Post, Body } from '@nestjs/common';
import type { ApiResponse, BondResult } from '@bond/shared';
import { BondService } from './bond.service';
import { BondInputDto } from './dto/bond-input.dto';

@Controller('bond')
export class BondController {
  constructor(private readonly bondService: BondService) {}

  @Post('calculate')
  calculate(@Body() input: BondInputDto): ApiResponse<BondResult> {
    try {
      const result = this.bondService.calculate(input);
      return { success: true, data: result };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Calculation failed',
      };
    }
  }
}
