import React from 'react';
import { HTMLTable, HTMLTableProps } from '@blueprintjs/core';
import { Column, useTable } from 'react-table';

import { useWindowSize } from '../../utils/hooks';

import styles from './Table.module.scss';

interface Props<T extends object> extends HTMLTableProps {
  columns: Column<T>[];
  data: T[];
}

function Table<T extends object>(props: Props<T>) {
  const [, height] = useWindowSize();
  const { data, columns, ...tableProps } = props;

  const tableInstance = useTable({ columns, data });

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    tableInstance;

  return (
    <div className={styles.table} style={{ height: height - 150 }}>
      <HTMLTable {...tableProps} {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()}>{column.render('Header')}</th>
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
  );
}

export default Table;
