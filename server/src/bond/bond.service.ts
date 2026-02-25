import { Injectable } from '@nestjs/common';
import type {
  BondResult,
  CashFlowEntry,
  PremiumDiscount,
} from '@bond/shared';
import { BondInputDto } from './dto/bond-input.dto';
import {
  solveYTM,
  calculateCurrentYield,
  calculateTotalInterest,
} from './utils/yield-math';

@Injectable()
export class BondService {
  calculate(input: BondInputDto): BondResult {
    const { faceValue, couponRate, marketPrice, yearsToMaturity, couponFrequency } = input;

    const periodsPerYear = couponFrequency === 'semi-annual' ? 2 : 1;
    const totalPeriods = yearsToMaturity * periodsPerYear;
    const couponPerPeriod = (faceValue * (couponRate / 100)) / periodsPerYear;

    const currentYield = calculateCurrentYield(faceValue, couponRate, marketPrice);
    const ytm = solveYTM(couponPerPeriod, faceValue, marketPrice, totalPeriods, periodsPerYear);
    const totalInterest = calculateTotalInterest(couponPerPeriod, totalPeriods, faceValue, marketPrice);
    const premiumDiscount = this.calculatePremiumDiscount(faceValue, marketPrice);
    const cashFlowSchedule = this.generateCashFlowSchedule(
      totalPeriods,
      periodsPerYear,
      couponPerPeriod,
      faceValue,
    );

    return {
      currentYield: Math.round(currentYield * 100) / 100,
      ytm: Math.round(ytm * 100) / 100,
      totalInterest: Math.round(totalInterest * 100) / 100,
      premiumDiscount,
      cashFlowSchedule,
    };
  }

  private calculatePremiumDiscount(faceValue: number, marketPrice: number): PremiumDiscount {
    const diff = marketPrice - faceValue;

    if (Math.abs(diff) < 0.01) {
      return { status: 'par', amount: 0 };
    }

    return {
      status: diff > 0 ? 'premium' : 'discount',
      amount: Math.round(Math.abs(diff) * 100) / 100,
    };
  }

  private generateCashFlowSchedule(
    totalPeriods: number,
    periodsPerYear: number,
    couponPerPeriod: number,
    faceValue: number,
  ): CashFlowEntry[] {
    const schedule: CashFlowEntry[] = [];
    const today = new Date();
    let cumulativeInterest = 0;

    for (let period = 1; period <= totalPeriods; period++) {
      cumulativeInterest += couponPerPeriod;

      const monthsToAdd = (12 / periodsPerYear) * period;
      const paymentDate = new Date(today);
      paymentDate.setMonth(paymentDate.getMonth() + monthsToAdd);

      const remainingPrincipal =
        period === totalPeriods ? 0 : faceValue;

      schedule.push({
        period,
        paymentDate: paymentDate.toISOString(),
        couponPayment: Math.round(couponPerPeriod * 100) / 100,
        cumulativeInterest: Math.round(cumulativeInterest * 100) / 100,
        remainingPrincipal,
      });
    }

    return schedule;
  }
}
