'use client';

import { InvalidateOptions } from '@tanstack/react-query';
import { Table } from '@tanstack/react-table';
import { PlusSquare, Search, X } from 'lucide-react';
import React, { Dispatch, SetStateAction } from 'react';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select';

import {
  DataTableFacetedFilter,
  DataTableFacetedFilterProps,
} from '@/components/data-table/components/data-table-faceted-filter';

// import { DataTableViewOptions } from '@/components/data-table/components/data-table-view-options';

import { ComparisonFilteringProps } from '../data-table';

interface DataTableFacetedFilterOptionsProps<TData, TValue> {
  dataTableFacetedFilterID: string;
  DataTableFacetedFilterOptions?: DataTableFacetedFilterProps<TData, TValue>['options'];
}

export type DataTableToolbarProps<TData, TValue> = {
  table: Table<TData>;
  DataTableFacetedFilterOptions?: Array<
    DataTableFacetedFilterOptionsProps<TData, TValue>
  >;
  comparisonFiltering?: ComparisonFilteringProps[];
  setComparisonFiltering?: Dispatch<SetStateAction<ComparisonFilteringProps[]>>;
  searching?: string;
  setSearching?: Dispatch<SetStateAction<string>>;
  onClickSearchBar?: (
    filters?:
      | {
          queryKey: string[];
        }
      | undefined,
    options?: InvalidateOptions,
  ) => Promise<void>;
  onClickComparisonFiltering?: (
    filters?:
      | {
          queryKey: string[];
        }
      | undefined,
    options?: InvalidateOptions,
  ) => Promise<void>;
};

export function DataTableToolbar<TData, TValue>({
  table,
  DataTableFacetedFilterOptions,
  comparisonFiltering,
  setComparisonFiltering,
  searching,
  setSearching,
  onClickSearchBar,
  onClickComparisonFiltering,
}: DataTableToolbarProps<TData, TValue>) {
  const isFiltered = table.getState().columnFilters?.length > 0;

  return (
    <>
    <div className="w-full flex flex-wrap items-center justify-between gap-2 bg-white p-4">
      <div className="flex items-center space-x-2">
        <p className="text-xs font-medium lg:text-nowrap">Show</p>
        <Select
          value={`${table.getState().pagination.pageSize}`}
          onValueChange={(value) => {
            table.setPageSize(Number(value));
          }}>
          <SelectTrigger className="h-8 w-[70px] border-none shadow-none bg-[#F5F4F4]">
            <SelectValue placeholder={table.getState().pagination.pageSize} />
          </SelectTrigger>
          <SelectContent side="top">
            {[10, 20, 30, 40, 50].map((pageSize) => (
              <SelectItem
                key={pageSize}
                value={`${pageSize}`}>
                {pageSize}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <p className="text-xs font-medium lg:text-nowrap">entries </p>
      </div>

      <div className="flex flex-1 items-center space-x-2">
        {searching !== undefined && (
          <form
            className="flex flex-row items-center gap-2"
            onSubmit={(e) => {
              e.preventDefault();
              if (onClickSearchBar) onClickSearchBar();
            }}>
            <Input
              placeholder="Filter tasks..."
              value={searching ?? ''}
              onChange={(event) => {
                if (setSearching) setSearching(event.target.value);
              }}
              className="h-8 w-[150px] lg:w-[250px]"
            />
            <Button
              type="submit"
              className="h-8 bg-transparent hover:bg-transparent border border-[#000]">
              <Search color="#000" />
            </Button>
          </form>
        )}
        {Array.isArray(DataTableFacetedFilterOptions) &&
          DataTableFacetedFilterOptions?.map(
            (obj, i) =>
              table.getColumn(obj.dataTableFacetedFilterID) && (
                <div key={i}>
                  <DataTableFacetedFilter
                    column={table.getColumn(obj.dataTableFacetedFilterID)}
                    title={obj.dataTableFacetedFilterID}
                    options={obj.DataTableFacetedFilterOptions ?? []}
                  />
                </div>
              ),
          )}
        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => table.resetColumnFilters()}
            className="h-8 px-2 lg:px-3">
            Reset
            <X />
          </Button>
        )}

        {comparisonFiltering && (
          <CustomComparisonFilter
            table={table}
            comparisonFiltering={comparisonFiltering}
            setComparisonFiltering={setComparisonFiltering}
            onClickSearch={onClickComparisonFiltering}
          />
        )}

        {/* <DataTableViewOptions table={table} /> */}
      </div>
    </div>
      {comparisonFiltering && comparisonFiltering.length > 0 && (
        <div className=" flex flex-wrap items-center border border-dashed border-[#000] rounded-sm p-1">
          {comparisonFiltering.map((obj, i) => (
            <p key={i} className="flex flex-row items-center text-xs plus-jakarta-sans-semibold mx-2">
              {obj.column}__{obj.operator} = {obj.value}
              <X className='hover:cursor-pointer w-[20px] text-red-500' onClick={() => {
                if (setComparisonFiltering) {
                  setComparisonFiltering(prev => prev.filter((_, index) => index !== i));
                }
              }}/>
            </p>
          ))}
        </div>
      )}
    </>
  );
}

interface CustomComparisonFilter<TData, TValue>
  extends Pick<
    DataTableToolbarProps<TData, TValue>,
    'comparisonFiltering' | 'setComparisonFiltering'
  > {
  table: DataTableToolbarProps<TData, TValue>['table'];
  onClickSearch: DataTableToolbarProps<TData, TValue>['onClickComparisonFiltering'];
}

export function CustomComparisonFilter<TData, TValue>({
  table,
  comparisonFiltering,
  setComparisonFiltering,
  onClickSearch,
}: CustomComparisonFilter<TData, TValue>) {
  const [selectedColumn, setSelectedColumn] = useState('');
  const [comparison, setComparison] = useState('');
  const [queryValue, setQueryValue] = useState('');

  const resetSelectValues = () => {
    setSelectedColumn('');
    setComparison('');
    setQueryValue('');
  };

  const addNewComparison = () => {
    if (setComparisonFiltering) {
      setComparisonFiltering((prev) => [
        ...prev,
        {
          column: selectedColumn,
          operator: comparison,
          value: queryValue,
        },
      ]);
    }

    resetSelectValues();
  };

  const clearAll = () => {
    setSelectedColumn('');
    setComparison('');
    setQueryValue('');
    // if (setComparisonFiltering) setComparisonFiltering([]);
  };

  return (
    <div className="flex flex-wrap items-center  gap-2 flex-grow">
      <Select
        value={selectedColumn}
        onValueChange={setSelectedColumn}>
        <SelectTrigger className="w-32 h-8 border border-[#9E9E9E] bg-transparent text-xs ">
          <SelectValue placeholder="column" />
        </SelectTrigger>
        <SelectContent>
          {table._getColumnDefs().map((row, i) => (
            <SelectItem
              key={i}
              value={row?.id ?? ''}>
              {row?.id}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select
        value={comparison}
        onValueChange={setComparison}>
        <SelectTrigger className="w-36 h-8 border border-[#9E9E9E] bg-transparent text-xs ">
          <SelectValue placeholder="operator" />
        </SelectTrigger>
        <SelectContent>
          {/* Equality */}
          <SelectItem value="eq">eq (Equals)</SelectItem>
          <SelectItem value="eq">ne (Equals)</SelectItem>
          {/* <SelectItem value="eqi">eqi (Equals Case-Insensitive)</SelectItem> */}

          {/* Comparisons */}
          <SelectItem value="gt">gt (Greater Than)</SelectItem>
          <SelectItem value="gte">gte (Greater Than or Equal)</SelectItem>
          <SelectItem value="lt">lt (Less Than)</SelectItem>
          <SelectItem value="lte">lte (Less Than or Equal)</SelectItem>

          {/* String operations */}
          {/* <SelectItem value="cont">cont (Contains)</SelectItem>
          <SelectItem value="conti">conti (Contains Case-Insensitive)</SelectItem>
          <SelectItem value="start">start (Starts With)</SelectItem>
          <SelectItem value="starti">starti (Starts With Case-Insensitive)</SelectItem>
          <SelectItem value="end">end (Ends With)</SelectItem>
          <SelectItem value="endi">endi (Ends With Case-Insensitive)</SelectItem> */}

          {/* Special operators */}
          {/* <SelectItem value="in">in (In List)</SelectItem> */}
          {/* <SelectItem value="null">null (Is Null)</SelectItem> */}

          {/* Pattern matching */}
          {/* <SelectItem value="regex">regex (Matches Regex)</SelectItem> */}
          {/* <SelectItem value="iregex">iregex (Case-Insensitive Regex)</SelectItem> */}
        </SelectContent>
      </Select>

      <Input
        className="w-32 h-8 border border-[#9E9E9E] bg-transparent text-xs "
        placeholder="value"
        value={queryValue}
        onChange={(e) => setQueryValue(e.target.value)}
      />
      {selectedColumn.length > 0 && comparison.length > 0 && queryValue.length > 0 && (
        <>
          <Button
            variant="ghost"
            className="h-8"
            type="button"
            onClick={addNewComparison}>
            Add
            <PlusSquare />
          </Button>
        </>
      )}
      {comparisonFiltering && comparisonFiltering.length > 0 && (
        <div className=" flex flex-col items-center border border-dashed border-[#000] rounded-sm p-1">
          <Button
            variant="ghost"
            className='h-8 bg-transparent hover:bg-transparent text-xs'
            onClick={() => {
              if (setComparisonFiltering) {
                setComparisonFiltering([]);
              }
              clearAll();
            }}
            >
            Clear Filters
            <X className='text-red-500'/>
          </Button>
        </div>
      )}
      <Button
        className="h-8 ml-auto text-xs w-24"
        type="button"
        onClick={() => {
          if (onClickSearch) {
            onClickSearch();
          }
          clearAll();
        }}>
        Apply
      </Button>
    </div>
  );
}
