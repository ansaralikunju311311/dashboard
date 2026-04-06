import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { Transaction } from '../../types';
import { INITIAL_TRANSACTIONS } from '../../data/mockData';

const loadState = (): Transaction[] => {
  try {
    const serializedState = localStorage.getItem('transactions');
    if (serializedState === null) {
      return INITIAL_TRANSACTIONS;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return INITIAL_TRANSACTIONS;
  }
};

const saveState = (state: Transaction[]) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('transactions', serializedState);
  } catch {
    // ignore write errors
  }
};

interface FinanceState {
  transactions: Transaction[];
  filters: {
    search: string;
    type: 'all' | 'income' | 'expense';
    sortBy: 'date-desc' | 'date-asc' | 'amount-desc' | 'amount-asc';
  };
}

const initialState: FinanceState = {
  transactions: loadState(),
  filters: {
    search: '',
    type: 'all',
    sortBy: 'date-desc',
  },
};

const financeSlice = createSlice({
  name: 'finance',
  initialState,
  reducers: {
    addTransaction: (state, action: PayloadAction<Transaction>) => {
      state.transactions.push(action.payload);
      saveState(state.transactions);
    },
    updateTransaction: (state, action: PayloadAction<Transaction>) => {
      const index = state.transactions.findIndex(t => t.id === action.payload.id);
      if (index !== -1) {
        state.transactions[index] = action.payload;
        saveState(state.transactions);
      }
    },
    deleteTransaction: (state, action: PayloadAction<string>) => {
      state.transactions = state.transactions.filter(t => t.id !== action.payload);
      saveState(state.transactions);
    },
    setSearchFilter: (state, action: PayloadAction<string>) => {
      state.filters.search = action.payload;
    },
    setTypeFilter: (state, action: PayloadAction<'all' | 'income' | 'expense'>) => {
      state.filters.type = action.payload;
    },
    setSortFilter: (state, action: PayloadAction<'date-desc' | 'date-asc' | 'amount-desc' | 'amount-asc'>) => {
      state.filters.sortBy = action.payload;
    },
  },
});

export const { addTransaction, updateTransaction, deleteTransaction, setSearchFilter, setTypeFilter, setSortFilter } = financeSlice.actions;
export default financeSlice.reducer;
