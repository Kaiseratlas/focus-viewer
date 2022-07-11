import React, { FC } from 'react';
import { Column, useTable } from 'react-table';

import { Focus } from '../features/focuses';

import { Table } from './Table';

interface Props {
  data: Focus[];
}

const FocusTable: FC<Props> = ({ data }) => {
  const columns = React.useMemo<Column<Focus>[]>(
    () => [
      {
        Header: 'Name',
        accessor: 'name',
      },
      {
        Header: 'Focus ID',
        accessor: 'id',
      },
      {
        Header: 'Icon ID',
        accessor: 'icon',
      },
      {
        Header: 'Cost',
        accessor: 'cost',
        Cell: ({ value: cost }) => (
          <span style={{ float: 'right' }}>{cost}</span>
        ),
      },
      // {
      //   Header: 'Is available if capitulated?',
      //   accessor: 'availableIfCapitulated',
      //   Cell: ({ value: availableIfCapitulated }) => (
      //     <>
      //       <Checkbox
      //         checked={availableIfCapitulated}
      //         style={{ margin: 0 }}
      //         disabled
      //       />
      //     </>
      //   ),
      // },
    ],
    [],
  );
  const tableInstance = useTable({ columns, data });

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    tableInstance;

  return (
    <Table striped {...getTableProps()}>
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

export { FocusTable };
