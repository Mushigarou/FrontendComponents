import { flexRender, Table } from '@tanstack/react-table';
import React, { useState } from 'react';

import { cn } from '@/lib/utils';

import { TableBody, TableCell, TableRow } from '@/components/ui/table';

import { DataTableProps } from '@/components/data-table/data-table';

interface DataTableBody<TData, TValue> {
  table: Table<TData>;
  tableBodyRowClassname?: string;
  tableTbodyClassname?: string;
  columns: DataTableProps<TData, TValue>['columns'];
  onClickFn?: (arg: TData | null) => void;
}

export const DataTableBody = <TData, TValue>({
  table,
  tableTbodyClassname,
  tableBodyRowClassname,
  columns,
  onClickFn,
}: DataTableBody<TData, TValue>) => {
  const [selectedRow, setSelectedRow] = useState<string>('0');

  return (
    <TableBody className={cn('flex-grow mt-0', tableTbodyClassname)}>
      {table.getRowModel().rows?.length ? (
        table.getRowModel().rows.map((row) => (
          <TableRow
            className={cn(
              onClickFn && 'hover:cursor-pointer',
              (row.id === selectedRow ) && onClickFn && 'bg-primary/40',
              tableBodyRowClassname,
              (Number(row.id) % 2) !== 0 && 'bg-[#fff]'
            )}
            onClick={() => {
              setSelectedRow(row.id);
              if (onClickFn) onClickFn(row.original as TData | null);
            }}
            key={row.id}
            data-state={row.getIsSelected() && 'selected'}>
            {row.getVisibleCells().map((cell) => (
              <TableCell
                key={cell.id}
                className="text-center">
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </TableCell>
            ))}
          </TableRow>
        ))
      ) : (
        <TableRow>
          <TableCell
            colSpan={columns.length}
            className="h-24 text-center">
            No results.
          </TableCell>
        </TableRow>
      )}
    </TableBody>
  );
};
