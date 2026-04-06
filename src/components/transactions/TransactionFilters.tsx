import React from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { setSearchFilter, setTypeFilter, setSortFilter } from '../../features/finance/financeSlice';
import { selectFilters } from '../../features/finance/selectors';
import { Input } from '../ui/Input';
import { Search } from 'lucide-react';

export const TransactionFilters: React.FC = () => {
  const dispatch = useAppDispatch();
  const filters = useAppSelector(selectFilters);

  return (
    <div className="flex flex-col md:flex-row gap-4 mb-4">
      <div className="flex-1 min-w-0">
        <Input
          placeholder="Search transactions..."
          icon={<Search className="w-4 h-4" />}
          value={filters.search}
          onChange={(e) => dispatch(setSearchFilter(e.target.value))}
        />
      </div>
      <div className="flex flex-wrap sm:flex-nowrap items-center gap-3">
        <div className="flex bg-muted p-1 rounded-md overflow-x-auto shrink-0 hide-scrollbar w-full sm:w-auto">
          {(['all', 'income', 'expense'] as const).map((type) => (
            <button
              key={type}
              onClick={() => dispatch(setTypeFilter(type))}
              className={`flex-1 sm:flex-none px-4 py-1.5 text-sm font-medium rounded-sm capitalize transition-colors whitespace-nowrap ${
                filters.type === type
                  ? 'bg-background shadow-sm text-foreground'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              {type}
            </button>
          ))}
        </div>
        <select
          value={filters.sortBy}
          onChange={(e) => dispatch(setSortFilter(e.target.value as any))}
          className="h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 w-full sm:w-auto cursor-pointer"
        >
          <option value="date-desc">Newest First</option>
          <option value="date-asc">Oldest First</option>
          <option value="amount-desc">Amount (High to Low)</option>
          <option value="amount-asc">Amount (Low to High)</option>
        </select>
      </div>
    </div>
  );
};
