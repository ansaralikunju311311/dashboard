import React from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { setSearchFilter, setTypeFilter } from '../../features/finance/financeSlice';
import { selectFilters } from '../../features/finance/selectors';
import { Input } from '../ui/Input';
import { Search } from 'lucide-react';

export const TransactionFilters: React.FC = () => {
  const dispatch = useAppDispatch();
  const filters = useAppSelector(selectFilters);

  return (
    <div className="flex flex-col sm:flex-row gap-4 mb-4">
      <div className="flex-1">
        <Input
          placeholder="Search transactions..."
          icon={<Search className="w-4 h-4" />}
          value={filters.search}
          onChange={(e) => dispatch(setSearchFilter(e.target.value))}
        />
      </div>
      <div className="flex bg-muted p-1 rounded-md">
        {(['all', 'income', 'expense'] as const).map((type) => (
          <button
            key={type}
            onClick={() => dispatch(setTypeFilter(type))}
            className={`px-4 py-1.5 text-sm font-medium rounded-sm capitalize transition-colors ${
              filters.type === type
                ? 'bg-background shadow-sm text-foreground'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            {type}
          </button>
        ))}
      </div>
    </div>
  );
};
