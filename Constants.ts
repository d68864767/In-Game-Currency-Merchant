// Constants.ts
// This file contains constants used throughout the game's transaction system.

export const BUY_COMMAND = 'Buy';
export const SELL_COMMAND = 'Sell';
export const INSUFFICIENT_BALANCE_MESSAGE = 'Insufficient balance';

// Currency constraints
export const MIN_CURRENCY_ID = 1;
export const MAX_CURRENCY_ID = 1e5; // 100,000

// Rate constraints
export const MIN_RATE_VALUE = 1;
export const MAX_RATE_VALUE = 1e9; // 1,000,000,000

// Query constraints
export const MIN_QUANTITY_VALUE = -1e9; // -1,000,000,000
export const MAX_QUANTITY_VALUE = 1e9;  // 1,000,000,000
export const MAX_QUERIES = 1e6; // 1,000,000

// Ensure that these constants are consistent with the project description and constraints.
