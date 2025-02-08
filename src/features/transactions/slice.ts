// features/transactions/transactionsSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";
import { Transaction, TransactionFormValues } from "./types";
import { loadTransactions, saveTransactions } from "./storage";

const initialState: { items: Transaction[] } = {
  items: loadTransactions(),
};

const transactionsSlice = createSlice({
  name: "transactions",
  initialState,
  reducers: {
    addTransaction: {
      reducer: (state, action: PayloadAction<Transaction>) => {
        if (Number.isNaN(action.payload.amount) || action.payload.amount <= 0) {
          return alert('Не корректное значение');
        }
        state.items.push(action.payload);
        saveTransactions(state.items);
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
      saveTransactions(state.items);
    },
    editTransaction: (state, action: PayloadAction<Transaction>) => {
      const index = state.items.findIndex((t) => t.id === action.payload.id);
      if (index !== -1) {
        state.items[index] = action.payload;
        saveTransactions(state.items);
      }
    },
  },
});

export const { addTransaction, deleteTransaction, editTransaction } =
  transactionsSlice.actions;
export default transactionsSlice.reducer;
