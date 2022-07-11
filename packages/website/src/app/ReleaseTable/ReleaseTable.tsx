import React, { FC } from 'react';
import { Column, useTable } from 'react-table';
import { useSelector } from 'react-redux';
import { DateTime } from 'luxon';

import { Table } from '../Table';
import { selectAllReleases } from '../../features/releases/releases.slice';
import { Release } from '../../features/releases';

const ReleaseTable: FC = () => {
  const columns = React.useMemo<Column<Release>[]>(
    () => [
      {
        Header: 'Version',
        accessor: 'version',
      },
      {
        Header: 'Name',
        accessor: 'name',
      },
      {
        Header: 'Released At',
        accessor: 'date',
        Cell: ({ value: date }) => DateTime.fromJSDate(date).toLocaleString(),
      },
    ],
    [],
  );

  const data = useSelector(selectAllReleases);

  const tableInstance = useTable({ columns, data });

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    tableInstance;

  return (
    <Table interactive striped {...getTableProps()}>
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
    </Table>
  );
};

export default ReleaseTable;
