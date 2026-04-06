import { createSelector } from '@reduxjs/toolkit';
import type { RootState } from '../../app/store';

export const selectAllTransactions = (state: RootState) => state.finance.transactions;
export const selectFilters = (state: RootState) => state.finance.filters;

export const selectFilteredTransactions = createSelector(
  [selectAllTransactions, selectFilters],
  (transactions, filters) => {
    return transactions.filter((t) => {
      const matchesSearch = t.category.toLowerCase().includes(filters.search.toLowerCase()) || 
                            t.description.toLowerCase().includes(filters.search.toLowerCase());
      const matchesType = filters.type === 'all' || t.type === filters.type;
      return matchesSearch && matchesType;
    }).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }
);

export const selectDashboardStats = createSelector(
  [selectAllTransactions],
  (transactions) => {
    let income = 0;
    let expenses = 0;

    transactions.forEach(t => {
      if (t.type === 'income') income += t.amount;
      else expenses += t.amount;
    });

    return {
      totalIncome: income,
      totalExpenses: expenses,
      totalBalance: income - expenses
    };
  }
);

export const selectCategoryBreakdown = createSelector(
  [selectAllTransactions],
  (transactions) => {
    const expensesByCategory: Record<string, number> = {};
    
    transactions.forEach(t => {
      if (t.type === 'expense') {
        expensesByCategory[t.category] = (expensesByCategory[t.category] || 0) + t.amount;
      }
    });

    return Object.keys(expensesByCategory).map(key => ({
      name: key,
      value: expensesByCategory[key]
    })).sort((a, b) => b.value - a.value);
  }
);
