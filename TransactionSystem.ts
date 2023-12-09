// TransactionSystem.ts
// This file defines the TransactionSystem class used to handle buy and sell queries in the game's transaction system.

import { Currency } from './Currency';
import { BUY_COMMAND, SELL_COMMAND, INSUFFICIENT_BALANCE_MESSAGE } from './Constants';

export class TransactionSystem {
  private currencies: Map<number, Currency>;

  constructor() {
    this.currencies = new Map<number, Currency>();
  }

  /**
   * Registers a currency in the system.
   * @param {Currency} currency - The currency to register.
   */
  public registerCurrency(currency: Currency): void {
    if (this.currencies.has(currency.id)) {
      throw new Error(`Currency with ID ${currency.id} is already registered.`);
    }
    this.currencies.set(currency.id, currency);
  }

  /**
   * Processes a buy or sell query.
   * @param {string} type - The type of the query (Buy or Sell).
   * @param {number} currencyId - The ID of the currency.
   * @param {number} quantity - The quantity to buy or sell.
   * @returns {string} - The total value of the transaction or an error message.
   */
  public processQuery(type: string, currencyId: number, quantity: number): string {
    const currency = this.currencies.get(currencyId);
    if (!currency) {
      throw new Error(`Currency with ID ${currencyId} is not registered.`);
    }

    switch (type) {
      case BUY_COMMAND:
        return this.processBuy(currency, quantity);
      case SELL_COMMAND:
        return this.processSell(currency, quantity);
      default:
        throw new Error(`Invalid query type: ${type}`);
    }
  }

  /**
   * Processes a buy query.
   * @param {Currency} currency - The currency to buy.
   * @param {number} quantity - The quantity to buy.
   * @returns {string} - The total value of the buy transaction or an error message.
   */
  private processBuy(currency: Currency, quantity: number): string {
    if (currency.balance < 0 && -currency.balance > quantity) {
      return INSUFFICIENT_BALANCE_MESSAGE;
    }

    let totalCost = 0;
    if (currency.balance < 0) {
      // Cover the negative balance first
      totalCost += -currency.balance * currency.buyRate;
      quantity -= -currency.balance;
      currency.balance = 0;
    }

    totalCost += quantity * currency.buyRate;
    currency.balance += quantity;

    return totalCost.toString();
  }

  /**
   * Processes a sell query.
   * @param {Currency} currency - The currency to sell.
   * @param {number} quantity - The quantity to sell.
   * @returns {string} - The total value of the sell transaction.
   */
  private processSell(currency: Currency, quantity: number): string {
    const totalValue = quantity * currency.sellRate;
    currency.balance -= quantity;

    return totalValue.toString();
  }
}
