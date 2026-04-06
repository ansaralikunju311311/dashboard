import React from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/Card';
import { ChartWrapper } from '../ui/ChartWrapper';
import { useAppSelector } from '../../hooks';
import { selectCategoryBreakdown } from '../../features/finance/selectors';

const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899', '#14b8a6'];

export const CategoryPieChart: React.FC = () => {
  const data = useAppSelector(selectCategoryBreakdown);
  const theme = useAppSelector((state) => state.ui.theme);

  return (
    <Card className="col-span-1">
      <CardHeader>
        <CardTitle>Spending by Category</CardTitle>
      </CardHeader>
      <CardContent className="flex justify-center">
        {data.length > 0 ? (
          <ChartWrapper height={300}>
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
                stroke="none"
              >
                {data.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip 
                formatter={(value: any) => `$${value}`}
                contentStyle={{ 
                  backgroundColor: theme === 'dark' ? '#1f2937' : '#ffffff',
                  borderColor: theme === 'dark' ? '#374151' : '#e5e7eb',
                  color: theme === 'dark' ? '#f9fafb' : '#111827',
                  borderRadius: '8px'
                }}
              />
              <Legend verticalAlign="bottom" height={36} />
            </PieChart>
          </ChartWrapper>
        ) : (
          <div className="flex h-[300px] items-center justify-center text-muted-foreground">
            No expenses recorded
          </div>
        )}
      </CardContent>
    </Card>
  );
};
