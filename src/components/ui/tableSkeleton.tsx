import React from 'react';
import { TableCell, TableRow } from './table';
import { Skeleton } from './skeleton';

const TableSkeleton = ({length}: {length: number}) => {
  return (
    Array.from({ length }, (_v, i) => (
      <TableRow className="border-b-0" key={i}>
        <TableCell>
          <div className="flex gap-5 items-center">
            <div className="flex gap-3 items-center">
              <div className="flex-shrink-0">
                <Skeleton className="w-8 h-8 rounded-full" />
              </div>
              <div className="space-y-1">
                <Skeleton className="w-24 h-2" />
                <Skeleton className="w-16 h-2" />
              </div>
            </div>
          </div>
        </TableCell>
        <TableCell className="text-end"><Skeleton className="w-10 h-2" /></TableCell>
        <TableCell className="text-end"><Skeleton className="w-10 h-2" /></TableCell>
        <TableCell className="lg:table-cell hidden text-end">
          <div className="space-y-1.5">
            <Skeleton className="w-10 h-2" />
          </div>
        </TableCell>
        <TableCell className="lg:table-cell hidden text-center"><Skeleton className="w-10 h-2" /></TableCell>
        <TableCell className="lg:table-cell hidden text-center"><Skeleton className="w-10 h-2" /></TableCell>
        <TableCell className="lg:table-cell hidden text-center"><Skeleton className="w-10 h-2" /></TableCell>
        <TableCell className="lg:table-cell hidden text-center"><Skeleton className="w-10 h-2" /></TableCell>
        <TableCell className="lg:table-cell hidden text-center"><Skeleton className="w-10 h-2" /></TableCell>
        <TableCell className="lg:table-cell hidden text-center"><Skeleton className="w-10 h-2" /></TableCell>
        <TableCell className="lg:table-cell hidden text-end">
          <Skeleton className="w-10 h-2" />
        </TableCell>
      </TableRow>
    ))
  );
};

export default TableSkeleton;