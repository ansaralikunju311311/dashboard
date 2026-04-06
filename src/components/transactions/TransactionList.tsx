import React, { useState, useEffect } from 'react';
import { Table, type Column } from '../ui/Table';
import type { Transaction } from '../../types';
import { useAppSelector, useAppDispatch } from '../../hooks';
import { selectFilteredTransactions, selectFilters } from '../../features/finance/selectors';
import { formatCurrency, cn } from '../../utils';
import { format } from 'date-fns';
import { Edit2, Trash2 } from 'lucide-react';
import { deleteTransaction } from '../../features/finance/financeSlice';
import { Pagination } from '../ui/Pagination';

interface TransactionListProps {
  onEdit: (transaction: Transaction) => void;
}

const ITEMS_PER_PAGE = 5;

export const TransactionList: React.FC<TransactionListProps> = ({ onEdit }) => {
  const allFilteredTransactions = useAppSelector(selectFilteredTransactions);
  const filters = useAppSelector(selectFilters);
  const role = useAppSelector((state) => state.ui.role);
  const dispatch = useAppDispatch();
  
  const [currentPage, setCurrentPage] = useState(1);

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [filters]);

  const totalPages = Math.ceil(allFilteredTransactions.length / ITEMS_PER_PAGE);
  const paginatedTransactions = allFilteredTransactions.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const columns: Column<Transaction>[] = [
    {
      key: 'date',
      header: 'Date',
      render: (row) => <span className="whitespace-nowrap">{format(new Date(row.date), 'MMM dd, yyyy')}</span>,
    },
    {
      key: 'description',
      header: 'Description',
      render: (row) => <span className="font-medium">{row.description}</span>,
    },
    {
      key: 'category',
      header: 'Category',
      render: (row) => (
        <span className="inline-flex items-center rounded-full bg-secondary px-2.5 py-0.5 text-xs font-semibold text-secondary-foreground">
          {row.category}
        </span>
      ),
    },
    {
      key: 'amount',
      header: 'Amount',
      render: (row) => (
        <span className={cn('font-bold', row.type === 'income' ? 'text-green-500' : 'text-foreground')}>
          {row.type === 'income' ? '+' : '-'}{formatCurrency(row.amount)}
        </span>
      ),
    },
  ];

  if (role === 'admin') {
    columns.push({
      key: 'actions',
      header: 'Actions',
      render: (row) => (
        <div className="flex items-center gap-2">
          <button
            onClick={() => onEdit(row)}
            className="p-1.5 text-muted-foreground hover:text-primary transition-colors rounded-md hover:bg-muted"
            title="Edit"
          >
            <Edit2 className="w-4 h-4" />
          </button>
          <button
            onClick={() => {
              if (window.confirm('Are you sure you want to delete this transaction?')) {
                dispatch(deleteTransaction(row.id));
              }
            }}
            className="p-1.5 text-muted-foreground hover:text-destructive transition-colors rounded-md hover:bg-destructive/10"
            title="Delete"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      ),
    });
  }

  return (
    <div className="mt-4 flex flex-col space-y-2">
      <Table<Transaction>
        data={paginatedTransactions}
        columns={columns}
        keyExtractor={(row) => row.id}
      />
      <Pagination 
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </div>
  );
};

