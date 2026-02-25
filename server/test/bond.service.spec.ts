import { BondService } from '../src/bond/bond.service';
import { BondInputDto } from '../src/bond/dto/bond-input.dto';

describe('BondService', () => {
  let service: BondService;

  beforeEach(() => {
    service = new BondService();
  });

  it('discount bond: YTM should be greater than coupon rate', () => {
    const input: BondInputDto = {
      faceValue: 1000,
      couponRate: 5,
      marketPrice: 950,
      yearsToMaturity: 10,
      couponFrequency: 'semi-annual',
    };
    const result = service.calculate(input);
    expect(result.ytm).toBeGreaterThan(5);
    expect(result.premiumDiscount.status).toBe('discount');
  });

  it('premium bond: YTM should be less than coupon rate', () => {
    const input: BondInputDto = {
      faceValue: 1000,
      couponRate: 5,
      marketPrice: 1050,
      yearsToMaturity: 10,
      couponFrequency: 'semi-annual',
    };
    const result = service.calculate(input);
    expect(result.ytm).toBeLessThan(5);
    expect(result.premiumDiscount.status).toBe('premium');
  });

  it('par bond: YTM should approximately equal coupon rate', () => {
    const input: BondInputDto = {
      faceValue: 1000,
      couponRate: 5,
      marketPrice: 1000,
      yearsToMaturity: 10,
      couponFrequency: 'semi-annual',
    };
    const result = service.calculate(input);
    expect(result.ytm).toBeCloseTo(5, 1);
    expect(result.premiumDiscount.status).toBe('par');
  });

  it('cash flow period count: annual=10, semi-annual=20 for 10yr bond', () => {
    const annualInput: BondInputDto = {
      faceValue: 1000,
      couponRate: 5,
      marketPrice: 1000,
      yearsToMaturity: 10,
      couponFrequency: 'annual',
    };
    const semiInput: BondInputDto = {
      faceValue: 1000,
      couponRate: 5,
      marketPrice: 1000,
      yearsToMaturity: 10,
      couponFrequency: 'semi-annual',
    };

    const annualResult = service.calculate(annualInput);
    const semiResult = service.calculate(semiInput);

    expect(annualResult.cashFlowSchedule).toHaveLength(10);
    expect(semiResult.cashFlowSchedule).toHaveLength(20);
  });

  it('cumulative interest should be monotonically increasing', () => {
    const input: BondInputDto = {
      faceValue: 1000,
      couponRate: 5,
      marketPrice: 950,
      yearsToMaturity: 10,
      couponFrequency: 'semi-annual',
    };
    const result = service.calculate(input);

    for (let i = 1; i < result.cashFlowSchedule.length; i++) {
      expect(result.cashFlowSchedule[i].cumulativeInterest).toBeGreaterThan(
        result.cashFlowSchedule[i - 1].cumulativeInterest,
      );
    }
  });

  it('last period remainingPrincipal should be 0', () => {
    const input: BondInputDto = {
      faceValue: 1000,
      couponRate: 5,
      marketPrice: 950,
      yearsToMaturity: 10,
      couponFrequency: 'semi-annual',
    };
    const result = service.calculate(input);
    const lastEntry = result.cashFlowSchedule[result.cashFlowSchedule.length - 1];
    expect(lastEntry.remainingPrincipal).toBe(0);
  });
});
