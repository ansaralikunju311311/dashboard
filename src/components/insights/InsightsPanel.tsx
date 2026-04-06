import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/Card';
import { useAppSelector } from '../../hooks';
import { selectCategoryBreakdown, selectAllTransactions } from '../../features/finance/selectors';
import { TrendingUp, Award, AlertCircle } from 'lucide-react';

export const InsightsPanel: React.FC = () => {
  const categoryData = useAppSelector(selectCategoryBreakdown);
  const allTransactions = useAppSelector(selectAllTransactions);

  // Compute insights
  const highestCategory = categoryData.length > 0 ? categoryData[0] : null;
  const recentLargeExpense = [...allTransactions]
    .filter(t => t.type === 'expense')
    .sort((a, b) => b.amount - a.amount)[0];

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Award className="w-5 h-5 text-primary" />
          AI Insights
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {highestCategory ? (
          <div className="p-3 bg-secondary/50 rounded-lg border border-border flex items-start gap-3">
            <TrendingUp className="w-5 h-5 text-orange-500 mt-0.5" />
            <div>
              <p className="text-sm font-medium">Highest Spend Area</p>
              <p className="text-sm text-muted-foreground mt-1">
                You spent the most on <strong className="text-foreground">{highestCategory.name}</strong> (${highestCategory.value}). Consider setting a budget.
              </p>
            </div>
          </div>
        ) : null}

        {recentLargeExpense && recentLargeExpense.amount > 500 ? (
          <div className="p-3 bg-secondary/50 rounded-lg border border-border flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-red-500 mt-0.5" />
            <div>
              <p className="text-sm font-medium">Large Expense Detected</p>
              <p className="text-sm text-muted-foreground mt-1">
                You had a significant expense of <strong className="text-foreground">${recentLargeExpense.amount}</strong> for {recentLargeExpense.description}.
              </p>
            </div>
          </div>
        ) : null}

        {!highestCategory && !recentLargeExpense && (
          <p className="text-sm text-muted-foreground text-center py-4">
            Not enough data to generate insights yet.
          </p>
        )}
      </CardContent>
    </Card>
  );
};
