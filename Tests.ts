import { TransactionSystem } from './TransactionSystem';
import { Currency } from './Currency';
import { BUY_COMMAND, SELL_COMMAND, INSUFFICIENT_BALANCE_MESSAGE } from './Constants';

/**
 * Tests.ts
 * This file contains tests for the game's transaction system.
 */

// Helper function to create a currency with given parameters
function createCurrency(id: number, buyRate: number, sellRate: number): Currency {
  return new Currency(id, buyRate, sellRate);
}

// Test suite for the TransactionSystem
class TransactionSystemTestSuite {
  private transactionSystem: TransactionSystem;

  constructor() {
    this.transactionSystem = new TransactionSystem();
  }

  // Run all tests
  public runTests() {
    console.log('Starting TransactionSystem tests...');
    this.testBuyingCurrency();
    this.testSellingCurrency();
    this.testInsufficientBalance();
    console.log('All tests completed.');
  }

  // Test buying currency
  private testBuyingCurrency() {
    console.log('Testing buying currency...');

    const currency = createCurrency(1, 10, 5);
    this.transactionSystem.addCurrency(currency);

    const result = this.transactionSystem.executeTransaction(BUY_COMMAND, 1, 10);
    if (result === 100) {
      console.log('Test passed: Buying currency returned correct value.');
    } else {
      console.error(`Test failed: Expected 100, got ${result}`);
    }
  }

  // Test selling currency
  private testSellingCurrency() {
    console.log('Testing selling currency...');

    const currency = createCurrency(2, 20, 10);
    this.transactionSystem.addCurrency(currency);

    const result = this.transactionSystem.executeTransaction(SELL_COMMAND, 2, 5);
    if (result === 50) {
      console.log('Test passed: Selling currency returned correct value.');
    } else {
      console.error(`Test failed: Expected 50, got ${result}`);
    }
  }

  // Test insufficient balance when buying
  private testInsufficientBalance() {
    console.log('Testing insufficient balance when buying...');

    const currency = createCurrency(3, 15, 7);
    this.transactionSystem.addCurrency(currency);

    // Simulate a negative balance by selling more than the player has
    this.transactionSystem.executeTransaction(SELL_COMMAND, 3, 10);

    const result = this.transactionSystem.executeTransaction(BUY_COMMAND, 3, 5);
    if (result === INSUFFICIENT_BALANCE_MESSAGE) {
      console.log('Test passed: Insufficient balance message returned correctly.');
    } else {
      console.error(`Test failed: Expected "${INSUFFICIENT_BALANCE_MESSAGE}", got ${result}`);
    }
  }
}

// Instantiate the test suite and run the tests
const testSuite = new TransactionSystemTestSuite();
testSuite.runTests();
