import React from 'react';
import { cn } from '../../utils';

export interface Column<T> {
  key: string;
  header: string;
  render?: (row: T) => React.ReactNode;
}

export interface TableProps<T> {
  data: T[];
  columns: Column<T>[];
  keyExtractor: (row: T) => string;
  className?: string;
}

export function Table<T>({ data, columns, keyExtractor, className }: TableProps<T>) {
  return (
    <div className={cn('w-full overflow-auto rounded-lg border border-border bg-card', className)}>
      <table className="w-full caption-bottom text-sm">
        <thead className="[&_tr]:border-b [&_tr]:border-border bg-muted/40">
          <tr className="border-b border-border transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
            {columns.map((col) => (
              <th
                key={col.key}
                className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0"
              >
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="[&_tr:last-child]:border-0">
          {data.length === 0 ? (
            <tr>
              <td colSpan={columns.length} className="p-4 text-center text-muted-foreground">
                No data available
              </td>
            </tr>
          ) : (
            data.map((row) => (
              <tr
                key={keyExtractor(row)}
                className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted group"
              >
                {columns.map((col) => (
                  <td key={col.key} className="p-4 align-middle [&:has([role=checkbox])]:pr-0">
                    {col.render ? col.render(row) : String((row as any)[col.key])}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
