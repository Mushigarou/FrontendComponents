'use client';

import { ColumnDef } from '@tanstack/react-table';

interface Test {
  name: string;
}

export const test: ColumnDef<Test>[] = [
  {
    id: 'name',
    header: 'Name',
    accessorKey: 'name',
  },
];
