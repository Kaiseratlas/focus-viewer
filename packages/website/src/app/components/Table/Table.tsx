import React, { useEffect } from 'react';
import { HTMLTable, HTMLTableProps } from '@blueprintjs/core';
import {
  Column,
  useTable,
  usePagination,
  TableInstance,
  UsePaginationInstanceProps,
  UsePaginationState,
  Row,
} from 'react-table';
import { useSearchParams } from 'react-router-dom';

import { useWindowSize } from '../../../utils/hooks';
import Pagination from '../../Pagination/Pagination';
import { TreeViewMode } from '../../../pages/TreePage/tree-view-mode.enum';

import styles from './Table.module.scss';

interface Props<T extends object> extends HTMLTableProps {
  columns: Column<T>[];
  data: T[];
  limit?: number;
  onRowClick?: (row: Row<T>) => void;
}

function Table<T extends object>(props: Props<T>) {
  const [, height] = useWindowSize();
  const { data, columns, onRowClick, ...tableProps } = props;

  const [searchParams, setSearchParams] = useSearchParams({
    page: '1',
  });
  const currentPage = searchParams.get('page');

  const tableInstance = useTable(
    {
      columns,
      data,
      // @ts-ignore
      initialState: { pageSize: 15, pageIndex: Number(currentPage) },
    },
    usePagination,
  ) as unknown as TableInstance & UsePaginationInstanceProps<any>;

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    // setPageSize,
    // setHiddenColumns,
    // @ts-ignore
    state: { pageIndex, pageSize },
  } = tableInstance;

  useEffect(() => {
    setSearchParams({ page: pageIndex + 1 });
  }, [pageIndex]);

  return (
    <>
      <div className={styles.table} style={{ height: height - 200 }}>
        <HTMLTable {...tableProps} {...getTableProps()}>
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th {...column.getHeaderProps()}>
                    {column.render('Header')}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {page.map((row) => {
              prepareRow(row);
              return (
                <tr
                  {...row.getRowProps()}
                  onClick={() => onRowClick && onRowClick(row)}
                >
                  {row.cells.map((cell) => (
                    <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </HTMLTable>
      </div>
      <Pagination
        data={data}
        currentPage={pageIndex}
        page={page}
        pageCount={pageCount}
        pageOptions={pageOptions}
        gotoPage={gotoPage}
        previousPage={previousPage}
        nextPage={nextPage}
        canPreviousPage={canPreviousPage}
        canNextPage={canNextPage}
        // limit={pageSize}
      />
    </>
  );
}

export default Table;
