import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/Card';
import { useAppSelector } from '../../hooks';
import { selectDashboardStats } from '../../features/finance/selectors';
import { formatCurrency } from '../../utils';
import { DollarSign, TrendingDown, TrendingUp } from 'lucide-react';

export const SummaryCards: React.FC = () => {
  const { totalBalance, totalIncome, totalExpenses } = useAppSelector(selectDashboardStats);

  return (
    <div className="grid gap-4 md:grid-cols-3">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Balance</CardTitle>
          <DollarSign className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{formatCurrency(totalBalance)}</div>
          <p className="text-xs text-muted-foreground mt-1">
            Overall available funds
          </p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Income</CardTitle>
          <TrendingUp className="h-4 w-4 text-green-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-green-500">{formatCurrency(totalIncome)}</div>
          <p className="text-xs text-muted-foreground mt-1">
            Total incoming funds
          </p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Expenses</CardTitle>
          <TrendingDown className="h-4 w-4 text-red-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-red-500">{formatCurrency(totalExpenses)}</div>
          <p className="text-xs text-muted-foreground mt-1">
            Total outgoing funds
          </p>
        </CardContent>
      </Card>
    </div>
  );
};
