import { IsNumber, IsIn, Min, Max } from 'class-validator';
import type { CouponFrequency } from '@bond/shared';

export class BondInputDto {
  @IsNumber()
  @Min(1)
  faceValue: number;

  @IsNumber()
  @Min(0)
  @Max(100)
  couponRate: number;

  @IsNumber()
  @Min(1)
  marketPrice: number;

  @IsNumber()
  @Min(1)
  yearsToMaturity: number;

  @IsIn(['annual', 'semi-annual'])
  couponFrequency: CouponFrequency;
}
