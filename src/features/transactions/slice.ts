// features/transactions/transactionsSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";
import { Transaction, TransactionFormValues } from "./types";
import { loadSavings, loadSavingsPercentage, loadTransactions, saveSavings, saveSavingsPercentage, saveTransactions } from "./storage";

const initialState: { items: Transaction[], savings: number, savingsPersentage: number } = {
  items: loadTransactions(),
  savings: loadSavings(),
  savingsPersentage: loadSavingsPercentage(),
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

        if (action.payload.type === "income") {
          const savingsAmount = (state.savingsPersentage / 100) * action.payload.amount;
          action.payload.amount -= savingsAmount
          state.savings += savingsAmount;
          saveSavings(state.savings);
        }
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
    setSavingsPercentage: (state, action: PayloadAction<number>) => {
      state.savingsPersentage = action.payload;
      saveSavingsPercentage(action.payload);
    },
  },
});

export const { addTransaction, deleteTransaction, editTransaction, setSavingsPercentage } =
  transactionsSlice.actions;
export default transactionsSlice.reducer;
