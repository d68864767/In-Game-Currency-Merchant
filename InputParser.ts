// InputParser.ts
// This file is responsible for parsing the input data for the game's transaction system.

import { Currency } from './Currency';
import { TransactionSystem } from './TransactionSystem';
import {
  BUY_COMMAND,
  SELL_COMMAND,
  MAX_QUERIES,
  isValidCurrencyId,
  isValidRateValue,
  isValidQuantityValue
} from './Constants';
import { Utilities } from './Utilities';

export class InputParser {
  private transactionSystem: TransactionSystem;

  constructor(transactionSystem: TransactionSystem) {
    this.transactionSystem = transactionSystem;
  }

  /**
   * Parses the input data and initializes the transaction system.
   * @param {string[]} inputLines - The lines of input to parse.
   */
  public parseInput(inputLines: string[]): void {
    const n = parseInt(inputLines[0]);
    for (let i = 1; i <= n; i++) {
      const [currencyId, buyRate, sellRate] = inputLines[i].split(' ').map(Number);
      if (
        isValidCurrencyId(currencyId) &&
        isValidRateValue(buyRate) &&
        isValidRateValue(sellRate)
      ) {
        const currency = new Currency(currencyId, buyRate, sellRate);
        this.transactionSystem.registerCurrency(currency);
      } else {
        throw new Error(`Invalid currency data on line ${i + 1}`);
      }
    }

    const q = parseInt(inputLines[n + 1]);
    if (q < 1 || q > MAX_QUERIES) {
      throw new Error(`Invalid number of queries: ${q}`);
    }

    for (let i = n + 2; i < n + 2 + q; i++) {
      const [type, x, y] = inputLines[i].split(' ');
      const currencyId = parseInt(x);
      const quantity = parseInt(y);

      if (!isValidCurrencyId(currencyId)) {
        throw new Error(`Invalid currency ID in query on line ${i + 1}`);
      }

      if (!isValidQuantityValue(quantity)) {
        throw new Error(`Invalid quantity in query on line ${i + 1}`);
      }

      if (type === BUY_COMMAND) {
        this.transactionSystem.handleBuyQuery(currencyId, quantity);
      } else if (type === SELL_COMMAND) {
        this.transactionSystem.handleSellQuery(currencyId, quantity);
      } else {
        throw new Error(`Invalid query type on line ${i + 1}`);
      }
    }
  }
}
