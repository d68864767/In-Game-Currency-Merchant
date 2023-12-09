// OutputFormatter.ts
// This file is responsible for formatting the output of the game's transaction system.

import { INSUFFICIENT_BALANCE_MESSAGE } from './Constants';

/**
 * Formats the output for a transaction query.
 * @param {number | string} result - The result of the transaction query.
 * @returns {string} - The formatted output string.
 */
export function formatTransactionOutput(result: number | string): string {
  if (typeof result === 'string') {
    // If the result is a string, it's a special message (e.g., "Insufficient balance").
    return result;
  } else {
    // If the result is a number, it's the total value of the transaction.
    return result.toString();
  }
}

/**
 * Formats the output for all transaction queries.
 * @param {Array<number | string>} results - The results of all transaction queries.
 * @returns {string} - The formatted output string for all queries.
 */
export function formatAllTransactionsOutput(results: Array<number | string>): string {
  return results.map(formatTransactionOutput).join('\n');
}
