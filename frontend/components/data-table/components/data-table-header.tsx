import { flexRender, Table } from '@tanstack/react-table';

import { cn } from '@/lib/utils';

import { TableHead, TableHeader, TableRow } from '@/components/ui/table';

interface DataTableHeaderProps<TData> {
  table: Table<TData>;
  tableHeaderClassname?: string;
  classname?: string;
}

export const  DataTableHeader = <TData,>({
  table,
  classname,
  tableHeaderClassname,
}: DataTableHeaderProps<TData>) => {

  return (
    <TableHeader className="bg-primary">
      {table.getHeaderGroups().map((headerGroup) => (
        <TableRow
          className=""
          key={headerGroup.id}>
          {headerGroup.headers.map((header) => {
            return (
              <TableHead
                key={header.id}
                className={cn(
                  ' text-black h-[20px] sticky top-0 text-center plus-jakarta-sans-bold text-xs',
                  classname,
                  tableHeaderClassname,
                )}>
                {header.isPlaceholder
                  ? null
                  : flexRender(header.column.columnDef.header, header.getContext())}
              </TableHead>
            );
          })}
        </TableRow>
      ))}
    </TableHeader>
  );
};
