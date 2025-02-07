import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { Transaction } from './types';

export const selectTransactions = (state: RootState) => state.transactions.items;

const aggregateByCategory = (transactions: Transaction[], type: 'income' | 'expense') => {
  return transactions
    .filter((t) => t.type === type)
    .reduce<Record<string, number>>((acc, t) => {
      acc[t.category] = (acc[t.category] || 0) + t.amount;
      return acc;
    }, {});
};

export const selectIncomeTotal = createSelector(selectTransactions, (transactions) =>
  transactions.reduce((sum, t) => (t.type === 'income' ? sum + t.amount : sum), 0)
);

export const selectExpenseTotal = createSelector(selectTransactions, (transactions) =>
  transactions.reduce((sum, t) => (t.type === 'expense' ? sum + t.amount : sum), 0)
);

export const selectIncomeByCategory = createSelector(selectTransactions, (transactions) =>
  aggregateByCategory(transactions, 'income')
);

export const selectExpenseByCategory = createSelector(selectTransactions, (transactions) =>
  aggregateByCategory(transactions, 'expense')
);