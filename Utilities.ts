// Utilities.ts
// This file contains utility functions used throughout the game's transaction system.

import {
  BUY_COMMAND,
  SELL_COMMAND,
  INSUFFICIENT_BALANCE_MESSAGE,
  MIN_CURRENCY_ID,
  MAX_CURRENCY_ID,
  MIN_RATE_VALUE,
  MAX_RATE_VALUE,
  MIN_QUANTITY_VALUE,
  MAX_QUANTITY_VALUE,
  MAX_QUERIES
} from './Constants';

/**
 * Validates the currency ID.
 * @param {number} currencyId - The ID of the currency to validate.
 * @returns {boolean} - True if the currency ID is valid, false otherwise.
 */
export function isValidCurrencyId(currencyId: number): boolean {
  return currencyId >= MIN_CURRENCY_ID && currencyId <= MAX_CURRENCY_ID;
}

/**
 * Validates the rate value.
 * @param {number} rate - The rate value to validate.
 * @returns {boolean} - True if the rate value is valid, false otherwise.
 */
export function isValidRateValue(rate: number): boolean {
  return rate >= MIN_RATE_VALUE && rate <= MAX_RATE_VALUE;
}

/**
 * Validates the quantity value.
 * @param {number} quantity - The quantity value to validate.
 * @returns {boolean} - True if the quantity value is valid, false otherwise.
 */
export function isValidQuantityValue(quantity: number): boolean {
  return quantity >= MIN_QUANTITY_VALUE && quantity <= MAX_QUANTITY_VALUE;
}

/**
 * Validates the number of queries.
 * @param {number} queryCount - The number of queries to validate.
 * @returns {boolean} - True if the number of queries is valid, false otherwise.
 */
export function isValidQueryCount(queryCount: number): boolean {
  return queryCount >= 1 && queryCount <= MAX_QUERIES;
}

/**
 * Calculates the total value of a buy or sell transaction.
 * @param {string} type - The type of transaction (Buy or Sell).
 * @param {number} rate - The rate of the currency.
 * @param {number} quantity - The quantity of the currency.
 * @param {number} [balance=0] - The current balance of the currency for the player.
 * @returns {string | number} - The total value of the transaction or an error message.
 */
export function calculateTransactionValue(
  type: string,
  rate: number,
  quantity: number,
  balance: number = 0
): string | number {
  if (type === BUY_COMMAND) {
    if (balance < 0 && quantity < -balance) {
      return INSUFFICIENT_BALANCE_MESSAGE;
    }
    return rate * (quantity + Math.max(-balance, 0));
  } else if (type === SELL_COMMAND) {
    return rate * quantity;
  } else {
    throw new Error(`Invalid transaction type: ${type}`);
  }
}

// Add any additional utility functions as needed.
