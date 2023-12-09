// DataStructures.ts
// This file contains the data structures used in the game's transaction system.

import {
  MIN_CURRENCY_ID,
  MAX_CURRENCY_ID,
  MIN_RATE_VALUE,
  MAX_RATE_VALUE
} from './Constants';

/**
 * Represents a currency with its buying and selling rates.
 */
export class Currency {
  id: number;
  buyRate: number;
  sellRate: number;

  constructor(id: number, buyRate: number, sellRate: number) {
    if (!this.isValidCurrencyId(id)) {
      throw new Error(`Invalid currency ID: ${id}`);
    }
    if (!this.isValidRateValue(buyRate)) {
      throw new Error(`Invalid buy rate value: ${buyRate}`);
    }
    if (!this.isValidRateValue(sellRate)) {
      throw new Error(`Invalid sell rate value: ${sellRate}`);
    }
    if (buyRate <= sellRate) {
      throw new Error(`Buy rate must be higher than sell rate for currency ID: ${id}`);
    }

    this.id = id;
    this.buyRate = buyRate;
    this.sellRate = sellRate;
  }

  /**
   * Validates the currency ID.
   * @param {number} currencyId - The ID of the currency to validate.
   * @returns {boolean} - True if the currency ID is valid, false otherwise.
   */
  private isValidCurrencyId(currencyId: number): boolean {
    return currencyId >= MIN_CURRENCY_ID && currencyId <= MAX_CURRENCY_ID;
  }

  /**
   * Validates the rate value.
   * @param {number} rate - The rate value to validate.
   * @returns {boolean} - True if the rate value is valid, false otherwise.
   */
  private isValidRateValue(rate: number): boolean {
    return rate >= MIN_RATE_VALUE && rate <= MAX_RATE_VALUE;
  }
}

/**
 * Manages the balances of all currencies for a player.
 */
export class CurrencyBalanceManager {
  private balances: Map<number, number>;

  constructor() {
    this.balances = new Map<number, number>();
  }

  /**
   * Updates the balance for a specific currency.
   * @param {number} currencyId - The ID of the currency.
   * @param {number} amount - The amount to update the balance by.
   */
  updateBalance(currencyId: number, amount: number): void {
    const currentBalance = this.balances.get(currencyId) || 0;
    this.balances.set(currencyId, currentBalance + amount);
  }

  /**
   * Gets the balance for a specific currency.
   * @param {number} currencyId - The ID of the currency.
   * @returns {number} - The current balance of the currency.
   */
  getBalance(currencyId: number): number {
    return this.balances.get(currencyId) || 0;
  }
}

// Export any additional data structures as needed.

