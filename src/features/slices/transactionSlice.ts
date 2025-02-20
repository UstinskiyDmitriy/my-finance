import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { Transaction } from "../../types/types";

import {
  loadSavings,
  loadSavingsPercentage,
  saveSavingsPercentage,
} from "../localStorage";
import { supabase } from "../../shared/api/supabase";

interface TransactionsState {
  items: Transaction[];
  loading: boolean;
  error: string | unknown;
  savings: number;
  savingsPersentage: number;
}

const initialState: TransactionsState = {
  items: [],
  loading: false,
  error: "",
  savings: loadSavings(),
  savingsPersentage: loadSavingsPercentage(),
};

export const loadTransactions = createAsyncThunk(
  "transactions/load",
  async (_, { rejectWithValue }) => {
    try {
      const { data, error } = await supabase.from("transactions").select("*");
      if (error) throw new Error(error.message);
      return data;
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

export const createTransaction = createAsyncThunk(
  "transactions/create",
  async (transaction: Transaction, { rejectWithValue }) => {
    try {
      const { data, error } = await supabase
        .from("transactions")
        .insert([transaction])
        .select()
        .single();

      if (error) throw new Error(error.message);
      return data;
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

export const removeTransaction = createAsyncThunk(
  "transactions/delete",
  async (id: string, { rejectWithValue }) => {
    try {
      const { error } = await supabase
        .from("transactions")
        .delete()
        .eq("id", id);
      if (error) throw new Error(error.message);
      return id;
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

export const editTransaction = createAsyncThunk(
  "transactions/edit",
  async (transaction: Transaction, { rejectWithValue }) => {
    try {
      const { error } = await supabase
        .from("transactions")
        .update(transaction)
        .eq("id", transaction.id);

      if (error) throw new Error(error.message);
      return transaction;
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

const transactionsSlice = createSlice({
  name: "transactions",
  initialState,
  reducers: {
    setTransactions: (state, action: PayloadAction<Transaction[]>) => {
      state.items = action.payload;
    },
    setSavingsPercentage: (state, action: PayloadAction<number>) => {
      state.savingsPersentage = action.payload;
      saveSavingsPercentage(action.payload);
    },
    setSavings: (state, action: PayloadAction<number>) => {
      state.savings = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadTransactions.pending, (state) => {
        state.loading = true;
      })
      .addCase(loadTransactions.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(loadTransactions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(createTransaction.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(removeTransaction.fulfilled, (state, action) => {
        state.items = state.items.filter((t) => t.id !== action.payload);
      })
      .addCase(editTransaction.fulfilled, (state, action) => {
        const index = state.items.findIndex((t) => t.id === action.payload.id);
        if (index !== -1) state.items[index] = action.payload;
      });
  },
});

export const { setTransactions, setSavingsPercentage, setSavings } =
  transactionsSlice.actions;
export default transactionsSlice.reducer;
