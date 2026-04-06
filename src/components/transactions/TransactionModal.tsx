import React, { useState, useEffect } from 'react';
import type { Transaction, TransactionType } from '../../types';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { useAppDispatch } from '../../hooks';
import { addTransaction, updateTransaction } from '../../features/finance/financeSlice';
import { X } from 'lucide-react';
import { format } from 'date-fns';

interface TransactionModalProps {
  isOpen: boolean;
  onClose: () => void;
  transactionToEdit?: Transaction | null;
}

export const TransactionModal: React.FC<TransactionModalProps> = ({ isOpen, onClose, transactionToEdit }) => {
  const dispatch = useAppDispatch();
  const [formData, setFormData] = useState({
    description: '',
    amount: '',
    category: '',
    type: 'expense' as TransactionType,
    date: format(new Date(), 'yyyy-MM-dd')
  });

  useEffect(() => {
    if (transactionToEdit) {
      setFormData({
        description: transactionToEdit.description,
        amount: String(transactionToEdit.amount),
        category: transactionToEdit.category,
        type: transactionToEdit.type,
        date: transactionToEdit.date
      });
    } else {
      setFormData({
        description: '',
        amount: '',
        category: '',
        type: 'expense',
        date: format(new Date(), 'yyyy-MM-dd')
      });
    }
  }, [transactionToEdit, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const submittedTransaction: Transaction = {
      id: transactionToEdit ? transactionToEdit.id : Math.random().toString(36).substr(2, 9),
      description: formData.description,
      amount: parseFloat(formData.amount),
      category: formData.category,
      type: formData.type,
      date: formData.date
    };

    if (transactionToEdit) {
      dispatch(updateTransaction(submittedTransaction));
    } else {
      dispatch(addTransaction(submittedTransaction));
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="bg-card w-full max-w-md rounded-xl border border-border shadow-lg max-h-[90vh] flex flex-col">
        <div className="flex items-center justify-between p-6 border-b border-border shrink-0">
          <h2 className="text-lg font-semibold">{transactionToEdit ? 'Edit Transaction' : 'Add Transaction'}</h2>
          <button onClick={onClose} className="p-1 rounded-md text-muted-foreground hover:bg-muted transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <div className="overflow-y-auto p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Type</label>
              <div className="flex gap-2">
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="type"
                    value="expense"
                    checked={formData.type === 'expense'}
                    onChange={() => setFormData({ ...formData, type: 'expense' })}
                    className="accent-primary"
                  />
                  Expense
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="type"
                    value="income"
                    checked={formData.type === 'income'}
                    onChange={() => setFormData({ ...formData, type: 'income' })}
                    className="accent-primary"
                  />
                  Income
                </label>
              </div>
            </div>

            <div className="space-y-1">
              <label className="block text-sm font-medium">Description</label>
              <Input
                required
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="e.g., Groceries"
              />
            </div>

            <div className="space-y-1">
              <label className="block text-sm font-medium">Amount</label>
              <Input
                required
                type="number"
                step="0.01"
                min="0"
                value={formData.amount}
                onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                placeholder="0.00"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="block text-sm font-medium">Category</label>
                <Input
                  required
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  placeholder="e.g., Food"
                />
              </div>
              <div className="space-y-1">
                <label className="block text-sm font-medium">Date</label>
                <Input
                  required
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                />
              </div>
            </div>

            <div className="pt-4 flex justify-end gap-2">
              <Button type="button" variant="ghost" onClick={onClose}>Cancel</Button>
              <Button type="submit">Save Transaction</Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
