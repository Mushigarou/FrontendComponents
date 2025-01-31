'use client';

import { InvalidateOptions } from '@tanstack/react-query';
import {
  ColumnDef,
  getCoreRowModel,
  useReactTable,
  PaginationState,
  ColumnFiltersState,
  SortingState,
} from '@tanstack/react-table';
import React, { Dispatch, SetStateAction, useState } from 'react';

import { cn } from '@/lib/utils';

import { Table } from '@/components/ui/table';

import { DataTableBody } from './components/data-table-body';
import { DataTableHeader } from './components/data-table-header';
import { DataTableToolbar, DataTableToolbarProps } from './components/data-tool-bar';
import { TablePagination } from './components/pagination';

export type ComparisonFilteringProps = {
  column: string;
  operator: string;
  value: string;
};

interface DataTableProps<TData, TValue> {
  data: TData[];
  columns: ColumnDef<TData, TValue>[];
  options?: {
    classname?: string;
    tableHeaderClassname?: string;
    tableBodyRowClassname?: string;
    tableTbodyClassname?: string;
    stickyHeader?: boolean;
    hideHeader?: boolean;
    onRowSelectionDo?: (arg: TData | null) => void;
    pagination?: {
      pagination?: PaginationState;
      setPagination?: Dispatch<SetStateAction<PaginationState>>;
      rowCount?: number;
    };
    filtering?: {
      columnFilters: ColumnFiltersState;
      setColumnFilters: Dispatch<SetStateAction<ColumnFiltersState>>;
      dataTableFacetedFilterOptions: DataTableToolbarProps<
        TData,
        TValue
      >['DataTableFacetedFilterOptions'];
    };
    comparisonFiltering?: {
      comparisonFiltering?: ComparisonFilteringProps[];
      setComparisonFiltering: Dispatch<SetStateAction<ComparisonFilteringProps[]>>;
      onClickSearch: (
        filters?:
          | {
              queryKey: string[];
            }
          | undefined,
        options?: InvalidateOptions,
      ) => Promise<void>;
    };
    sorting?: {
      sorting: SortingState;
      setSorting: Dispatch<SetStateAction<SortingState>>;
    };
    searching?: {
      searching: string;
      setSearching: Dispatch<SetStateAction<string>>;
      onClickSearch: (
        filters?:
          | {
              queryKey: string[];
            }
          | undefined,
        options?: InvalidateOptions,
      ) => Promise<void>;
    };
  };
}

export type { DataTableProps };

export function DataTable<TData, TValue>({
  data,
  columns,
  options = {
    classname: undefined,
    stickyHeader: undefined,
    hideHeader: undefined,
    onRowSelectionDo: undefined,
    tableHeaderClassname: undefined,
    tableTbodyClassname: undefined,
    pagination: {
      pagination: undefined,
      setPagination: undefined,
      rowCount: undefined,
    },
    filtering: {
      columnFilters: [],
      setColumnFilters: () => [],
      dataTableFacetedFilterOptions: [],
    },
    comparisonFiltering: {
      comparisonFiltering: undefined,
      setComparisonFiltering: () => [],
      onClickSearch: async () => {},
    },
    sorting: {
      sorting: [],
      setSorting: () => [],
    },
    searching: {
      searching: '',
      setSearching: () => {},
      onClickSearch: async () => {},
    },
  },
}: DataTableProps<TData, TValue>) {
  const [rowSelection, setRowSelection] = useState({});
  const defaultData = React.useMemo(() => [], []);
  const table = useReactTable({
    columns,
    data: data ?? defaultData,
    getCoreRowModel: getCoreRowModel(),
    onRowSelectionChange: setRowSelection,
    onPaginationChange: options.pagination?.setPagination,
    onColumnFiltersChange: options.filtering?.setColumnFilters,
    onSortingChange: options.sorting?.setSorting,
    rowCount: options.pagination?.rowCount,
    manualPagination: options.pagination?.pagination && true,
    manualSorting: options.sorting?.sorting && true,
    state: {
      sorting: options.sorting?.sorting,
      columnFilters: options.filtering?.columnFilters,
      rowSelection,
      pagination: options?.pagination?.pagination,
    },
  });

  return (
    <div className={cn('flex flex-col',  options.classname)}>
      {!options.hideHeader && (
        <DataTableToolbar
          table={table}
          DataTableFacetedFilterOptions={options.filtering?.dataTableFacetedFilterOptions}
          comparisonFiltering={options.comparisonFiltering?.comparisonFiltering}
          setComparisonFiltering={options.comparisonFiltering?.setComparisonFiltering}
          onClickComparisonFiltering={options.comparisonFiltering?.onClickSearch}
          searching={options.searching?.searching}
          setSearching={options.searching?.setSearching}
          onClickSearchBar={options.searching?.onClickSearch}
        />
      )}
      <div className={cn('overflow-auto relative flex-grow')}>
        {' '}
        {options.stickyHeader ? (
          <StickyHeaderTable className={'min-w-[300px] flex-grow text-xs'}>
            <DataTableHeader
              table={table}
              tableHeaderClassname={options.tableHeaderClassname}
            />
            <DataTableBody
              table={table}
              tableTbodyClassname={options.tableTbodyClassname}
              tableBodyRowClassname={options?.tableBodyRowClassname}
              columns={columns}
              onClickFn={options.onRowSelectionDo}
            />
          </StickyHeaderTable>
        ) : (
          <Table className={' min-w-[300px] flex-grow text-xs'}>
            <DataTableHeader
              table={table}
              tableHeaderClassname={options.tableHeaderClassname}
            />
            <DataTableBody
              table={table}
              tableTbodyClassname={options.tableTbodyClassname}
              tableBodyRowClassname={options?.tableBodyRowClassname}
              columns={columns}
              onClickFn={options.onRowSelectionDo}
            />
          </Table>
        )}
      </div>
      {options.pagination?.pagination && <TablePagination table={table} />}
    </div>
  );
}

const StickyHeaderTable = React.forwardRef<
  HTMLTableElement,
  React.HTMLAttributes<HTMLTableElement>
>(({ className, ...props }, ref) => (
  <table
    ref={ref}
    className={cn('w-full caption-bottom text-sm', className)}
    {...props}
  />
));
StickyHeaderTable.displayName = 'StickyHeaderTable';
