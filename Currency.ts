// Currency.ts
// This file defines the Currency class used in the game's transaction system.

import {
  MIN_CURRENCY_ID,
  MAX_CURRENCY_ID,
  MIN_RATE_VALUE,
  MAX_RATE_VALUE
} from './Constants';

export class Currency {
  id: number;
  buyRate: number;
  sellRate: number;
  balance: number;

  constructor(id: number, buyRate: number, sellRate: number) {
    this.validateCurrencyId(id);
    this.validateRateValue(buyRate);
    this.validateRateValue(sellRate);
    this.validateRateDifference(buyRate, sellRate);

    this.id = id;
    this.buyRate = buyRate;
    this.sellRate = sellRate;
    this.balance = 0; // Initialize balance to 0 for new currency
  }

  /**
   * Validates the currency ID.
   * @param {number} currencyId - The ID of the currency to validate.
   */
  private validateCurrencyId(currencyId: number): void {
    if (currencyId < MIN_CURRENCY_ID || currencyId > MAX_CURRENCY_ID) {
      throw new Error(`Invalid currency ID: ${currencyId}`);
    }
  }

  /**
   * Validates the rate value.
   * @param {number} rate - The rate value to validate.
   */
  private validateRateValue(rate: number): void {
    if (rate < MIN_RATE_VALUE || rate > MAX_RATE_VALUE) {
      throw new Error(`Invalid rate value: ${rate}`);
    }
  }

  /**
   * Validates that the buy rate is higher than the sell rate.
   * @param {number} buyRate - The buy rate to validate.
   * @param {number} sellRate - The sell rate to validate.
   */
  private validateRateDifference(buyRate: number, sellRate: number): void {
    if (buyRate <= sellRate) {
      throw new Error(`Buy rate must be higher than sell rate for currency ID: ${this.id}`);
    }
  }

  /**
   * Updates the balance of the currency based on the transaction type.
   * @param {string} type - The type of transaction (Buy or Sell).
   * @param {number} quantity - The quantity of the currency.
   * @returns {string | number} - The total value of the transaction or an error message.
   */
  processTransaction(type: string, quantity: number): string | number {
    if (type === 'Buy') {
      if (this.balance + quantity < 0) {
        return 'Insufficient balance';
      }
      this.balance += quantity;
      return this.buyRate * quantity;
    } else if (type === 'Sell') {
      this.balance -= quantity;
      return this.sellRate * quantity;
    } else {
      throw new Error(`Invalid transaction type: ${type}`);
    }
  }
}
