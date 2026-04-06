import React, { type ReactNode } from 'react';
import { ResponsiveContainer } from 'recharts';
import { cn } from '../../utils';

interface ChartWrapperProps {
  children: ReactNode;
  height?: number | string;
  className?: string;
}

export const ChartWrapper: React.FC<ChartWrapperProps> = ({ 
  children, 
  height = 300,
  className 
}) => {
  return (
    <div className={cn('w-full', className)} style={{ height }}>
      <ResponsiveContainer width="100%" height="100%">
        {children}
      </ResponsiveContainer>
    </div>
  );
};
