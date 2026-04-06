import React, { useMemo } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/Card';
import { ChartWrapper } from '../ui/ChartWrapper';
import { useAppSelector } from '../../hooks';
import { selectAllTransactions } from '../../features/finance/selectors';
import { format } from 'date-fns';

export const BalanceTrendChart: React.FC = () => {
  const transactions = useAppSelector(selectAllTransactions);
  const theme = useAppSelector((state) => state.ui.theme);

  const chartData = useMemo(() => {
    // Sort transactions by date ascending
    const sorted = [...transactions].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    
    let runningBalance = 0;
    const dailyBalance: Record<string, number> = {};

    sorted.forEach((t) => {
      if (t.type === 'income') {
        runningBalance += t.amount;
      } else {
        runningBalance -= t.amount;
      }
      dailyBalance[t.date] = runningBalance;
    });

    return Object.entries(dailyBalance).map(([date, balance]) => ({
      date: format(new Date(date), 'MMM dd'),
      balance
    }));
  }, [transactions]);

  const colors = {
    grid: theme === 'dark' ? '#333' : '#e5e7eb',
    text: theme === 'dark' ? '#9ca3af' : '#6b7280',
    line: theme === 'dark' ? '#3b82f6' : '#2563eb'
  };

  return (
    <Card className="col-span-1 md:col-span-2">
      <CardHeader>
        <CardTitle>Balance Trend</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartWrapper height={300}>
          <LineChart data={chartData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={colors.grid} />
            <XAxis dataKey="date" stroke={colors.text} fontSize={12} tickLine={false} axisLine={false} />
            <YAxis 
              stroke={colors.text} 
              fontSize={12} 
              tickLine={false} 
              axisLine={false} 
              tickFormatter={(value) => `$${value}`} 
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: theme === 'dark' ? '#1f2937' : '#ffffff',
                borderColor: theme === 'dark' ? '#374151' : '#e5e7eb',
                color: theme === 'dark' ? '#f9fafb' : '#111827',
                borderRadius: '8px'
              }}
              itemStyle={{ color: colors.line }}
            />
            <Line 
              type="monotone" 
              dataKey="balance" 
              stroke={colors.line} 
              strokeWidth={3} 
              dot={{ r: 4, strokeWidth: 2 }} 
              activeDot={{ r: 6 }} 
            />
          </LineChart>
        </ChartWrapper>
      </CardContent>
    </Card>
  );
};
