import type { Transaction } from '../types';
import { subDays, format } from 'date-fns';

const today = new Date();

export const INITIAL_TRANSACTIONS: Transaction[] = [
  { id: '1', date: format(subDays(today, 2), 'yyyy-MM-dd'), amount: 5000, category: 'Salary', type: 'income', description: 'Monthly Salary' },
  { id: '2', date: format(subDays(today, 2), 'yyyy-MM-dd'), amount: 150, category: 'Food', type: 'expense', description: 'Groceries' },
  { id: '3', date: format(subDays(today, 3), 'yyyy-MM-dd'), amount: 60, category: 'Transport', type: 'expense', description: 'Gas Station' },
  { id: '4', date: format(subDays(today, 5), 'yyyy-MM-dd'), amount: 200, category: 'Utilities', type: 'expense', description: 'Electricity Bill' },
  { id: '5', date: format(subDays(today, 6), 'yyyy-MM-dd'), amount: 120, category: 'Entertainment', type: 'expense', description: 'Netflix & Spotify' },
  { id: '6', date: format(subDays(today, 8), 'yyyy-MM-dd'), amount: 45, category: 'Food', type: 'expense', description: 'Restaurant' },
  { id: '7', date: format(subDays(today, 10), 'yyyy-MM-dd'), amount: 500, category: 'Freelance', type: 'income', description: 'Web Design Project' },
  { id: '8', date: format(subDays(today, 12), 'yyyy-MM-dd'), amount: 300, category: 'Shopping', type: 'expense', description: 'New Clothes' },
  { id: '9', date: format(subDays(today, 15), 'yyyy-MM-dd'), amount: 90, category: 'Transport', type: 'expense', description: 'Train Tickets' },
  { id: '10', date: format(subDays(today, 18), 'yyyy-MM-dd'), amount: 1200, category: 'Rent', type: 'expense', description: 'Monthly Rent' },
  { id: '11', date: format(subDays(today, 20), 'yyyy-MM-dd'), amount: 60, category: 'Health', type: 'expense', description: 'Pharmacy' },
  { id: '12', date: format(subDays(today, 22), 'yyyy-MM-dd'), amount: 80, category: 'Food', type: 'expense', description: 'Groceries' },
];
