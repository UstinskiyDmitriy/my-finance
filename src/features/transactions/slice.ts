  import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';
  import { v4 as uuidv4 } from 'uuid';
  import { Transaction, TransactionFormValues } from './types';
  import { RootState } from '../../app/store';

  interface TransactionsState {
    items: Transaction[];
  }

  export const selectTransactions = (state: RootState) => state.transactions.items;

  export const selectIncomeTotal = createSelector(selectTransactions, (transactions) =>
    transactions
      .filter((t) => t.type === 'income')
      .reduce((sum, t) => sum + t.amount, 0)
  );

  export const selectExpenseTotal = createSelector(selectTransactions, (transactions) =>
    transactions
      .filter((t) => t.type === 'expense')
      .reduce((sum, t) => sum + t.amount, 0)
  );

  export const selectExpenseByCategory = createSelector(selectTransactions, (transactions) => {
    const categories: Record<string, number> = {};
  
    transactions
      .filter((t) => t.type === 'expense')
      .forEach((t) => {
        categories[t.category] = (categories[t.category] || 0) + t.amount;
      });
  
    return categories;
  });
  

  export const selectIncomeByCategory = createSelector(selectTransactions, (transactions) => {
    const categories: Record<string, number> = {};
  
    transactions
      .filter((t) => t.type === 'income')
      .forEach((t) => {
        categories[t.category] = (categories[t.category] || 0) + t.amount;
      });
  
    return categories;
  });

  const initialState: TransactionsState = {
      items: localStorage.getItem('transactions') 
      ? JSON.parse(localStorage.getItem('transactions')!) 
      : [],
  };

  const transactionsSlice = createSlice({
    name: 'transactions',
    initialState,
    reducers: {
      addTransaction: {
        reducer: (state, action: PayloadAction<Transaction>) => {
          if(Number.isNaN(action.payload.amount) || action.payload.amount === 0) {
            return alert('Введите сумму')
          }
          state.items.push(action.payload);
        },
        prepare: (values: TransactionFormValues) => ({
          payload: {
            ...values,
            id: uuidv4(),
            date: new Date().toISOString(),
          },
        }),
      },
      deleteTransaction: (state, action: PayloadAction<string>) => {
        state.items = state.items.filter(
          (transaction) => transaction.id !== action.payload
        );
      },
      editTransaction: (state, action: PayloadAction<Transaction>) => {
        const index = state.items.findIndex(
          (t) => t.id === action.payload.id
        );
        if (index !== -1) {
          state.items[index] = action.payload;
        }
      },
    },
  });

  export const { addTransaction, deleteTransaction, editTransaction } =
    transactionsSlice.actions;
  export default transactionsSlice.reducer;