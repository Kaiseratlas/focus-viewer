import React, { useState } from 'react';
import {
  Button,
  ButtonGroup,
  HTMLTable,
  HTMLTableProps,
  Navbar,
} from '@blueprintjs/core';
import { Column, useTable, usePagination } from 'react-table';

import { useWindowSize } from '../../utils/hooks';
import Pagination from '../Pagination/Pagination';

import styles from './Table.module.scss';

interface Props<T extends object> extends HTMLTableProps {
  columns: Column<T>[];
  data: T[];
  limit?: number;
}

function Table<T extends object>(props: Props<T>) {
  const [, height] = useWindowSize();
  const { data, columns, ...tableProps } = props;

  const tableInstance = useTable<>(
    {
      columns,
      data,
    },
    usePagination,
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    setHiddenColumns,
    // state: { pageIndex, pageSize },
  } = tableInstance;

  return (
    <>
      <div className={styles.table} style={{ height: height - 150 }}>
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
            {rows.map((row) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()}>
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
        currentPage={page}
        onPageChange={gotoPage}
        // limit={pageSize}
      />
    </>
  );
}

export default Table;
