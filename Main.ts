import { TransactionSystem } from './TransactionSystem';
import { InputParser } from './InputParser';
import { OutputFormatter } from './OutputFormatter';
import { Currency } from './Currency';
import { BUY_COMMAND, SELL_COMMAND } from './Constants';

// Main.ts
// This file is the entry point for the game's transaction system.

function main(input: string): void {
  // Initialize the input parser and parse the input data
  const inputParser = new InputParser();
  const { currencies, queries } = inputParser.parseInput(input);

  // Initialize the transaction system with the parsed currencies
  const transactionSystem = new TransactionSystem();
  currencies.forEach((currencyData) => {
    const currency = new Currency(currencyData.id, currencyData.buyRate, currencyData.sellRate);
    transactionSystem.addCurrency(currency);
  });

  // Process each query and output the result
  queries.forEach((query) => {
    let result: string | number;
    try {
      if (query.type === BUY_COMMAND) {
        result = transactionSystem.buyCurrency(query.currencyId, query.quantity);
      } else if (query.type === SELL_COMMAND) {
        result = transactionSystem.sellCurrency(query.currencyId, query.quantity);
      } else {
        throw new Error('Invalid query type');
      }
    } catch (error) {
      result = error.message;
    }

    // Output the result of the query
    console.log(result);
  });
}

// Assuming we have a function to get the input data as a string
const input = getInputData();
main(input);

// Note: The getInputData function is assumed to be implemented elsewhere in the project.
// It should read the input data (from a file, stdin, etc.) and return it as a string.
