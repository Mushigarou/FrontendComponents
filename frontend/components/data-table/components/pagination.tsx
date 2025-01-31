import { Table } from '@tanstack/react-table';
import { ChevronsLeft, ChevronsRight } from 'lucide-react';

import { cn } from '@/lib/utils';

import { Button } from '@/components/ui/button';

interface DataTablePaginationProps<TData> {
  table: Table<TData>;
}

export function TablePagination<TData>({ table }: DataTablePaginationProps<TData>) {
  const totalPages = table.getPageCount();
  const currentPage = table.getState().pagination.pageIndex + 1;

  let pagesToShow: number[] = [];
  if (totalPages <= 3) {
    pagesToShow = Array.from({ length: totalPages }, (_, i) => i + 1);
  } else {
    if (currentPage <= 2) {
      pagesToShow = [1, 2, 3];
    } else if (currentPage >= totalPages - 1) {
      pagesToShow = [totalPages - 2, totalPages - 1, totalPages];
    } else {
      pagesToShow = [currentPage - 1, currentPage, currentPage + 1];
    }
  }

  return (
    <div className="flex flex-wrap items-center justify-center p-2 w-full self-end mt-4">
      {/* <div className="flex-1 text-xs text-muted-foreground">
        {table.getRowCount()} report(s) in total.
      </div> */}
      <div className="flex items-center space-x-6 lg:space-x-8">
        {/* <div className="flex w-full items-center justify-center text-xs font-medium">
          Page {currentPage} of {totalPages}
        </div> */}
        <div className="flex items-center space-x-2 ">
          <Button
            className="bg-transparent  hover:bg-transparent text-[#9E9E9E] text-xs"
            onClick={() => table.setPageIndex(0)}
            disabled={!table.getCanPreviousPage()}>
            <span className="sr-only">Go to first page</span>
            <ChevronsLeft />
          </Button>

          <Button
            className="bg-transparent  hover:bg-transparent text-[#9E9E9E] text-xs"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}>
            Previous
          </Button>

          {pagesToShow.map((page) => (
            <Button
              className={cn(
                'h-8 w-8 p-0 rounded-sm',
                currentPage === page
                  ? 'bg-[#50A247] text-white'
                  : 'bg-[#E0E0E0] text-black',
              )}
              key={page}
              onClick={() => table.setPageIndex(page - 1)}>
              {page}
            </Button>
          ))}

          <Button
            className="bg-transparent  hover:bg-transparent text-[#9E9E9E] text-xs"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}>
            Next
          </Button>

          <Button
            className="bg-transparent  hover:bg-transparent text-[#9E9E9E] text-xs"
            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
            disabled={!table.getCanNextPage()}>
            <span className="sr-only">Go to last page</span>
            <ChevronsRight />
          </Button>
        </div>
      </div>
    </div>
  );
}
