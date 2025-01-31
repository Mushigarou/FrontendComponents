"use client"

import { useQueryClient } from '@tanstack/react-query';
import { ColumnFiltersState, PaginationState, SortingState } from '@tanstack/react-table';
import { useState, useMemo } from 'react';

import { ComparisonFilteringProps } from '@/components/data-table/data-table';

import { useFetchData } from './api/use-get-data';

interface useQueryAndInitializeTableStatesProps<T> {
  endpoint: string;
  queryKey: string;
}

export const useQueryAndInitializeTableStates = <T,>({
  endpoint,
  queryKey,
}: useQueryAndInitializeTableStatesProps<T>) => {
  const queryClient = useQueryClient();
  const [columnsFilters, setColumnsFilters] = useState<ColumnFiltersState>([]);
  const [filteringQueries, setFilteringQueries] = useState<string>('');
  const [sorting, setSorting] = useState<SortingState>([]);
  const [searching, setSearching] = useState<string>('');
  const [comparisonFiltering, setComparisonFiltering] = useState<
    ComparisonFilteringProps[]
  >([]);
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });

  useMemo(() => {
    const parts: string[] = [];
    columnsFilters.forEach((obj) => {
      if (Array.isArray(obj.value)) {
        obj.value.forEach((filter) => {
          const replacedFilter = filter.replace(/\s+/g, '_');
          parts.push(`${obj.id}=${replacedFilter}`);
        });
      }
    });
    let finalQuery = parts.join('&');
    if (finalQuery) {
      finalQuery = `?${finalQuery}`;
    }
    setFilteringQueries(finalQuery);
  }, [columnsFilters]);

  // Fetch data with all parameters
  const { data, isLoading, isError } = useFetchData<T>(
    endpoint,
    queryKey,
    [filteringQueries, pagination, sorting],
    {
      skip: pagination.pageIndex * pagination.pageSize,
      limit: pagination.pageSize,
      ...(sorting?.[0]?.id ? { [sorting[0].id]: sorting[0].desc ? '-asc' : 'asc' } : {}),
      ...(searching.length > 0 ? { search: searching } : {}),
      ...(comparisonFiltering.length > 0
        ? Object.fromEntries(
            comparisonFiltering.map(({ column, operator, value }) => [
              `${column}__${operator}`,
              value,
            ]),
          )
        : {}),
    },
  );

  return {
    // Data state
    data: data,
    isLoading,
    isError,

    // Pagination
    pagination,
    setPagination,

    // Filtering
    columnsFilters,
    setColumnsFilters,
    filteringQueries,

    // Sorting
    sorting,
    setSorting,

    // Search
    searching,
    setSearching,

    // Comparison filtering
    comparisonFiltering,
    setComparisonFiltering,

    // Optional: Add query client if needed for invalidations
    queryClient,
  };
};
