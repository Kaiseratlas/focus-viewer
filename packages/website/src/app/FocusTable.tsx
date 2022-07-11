import React, { FC } from 'react';
import { Column, useTable } from 'react-table';
import { Checkbox } from '@blueprintjs/core';

import { Focus } from '../features/focuses';

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
        Header: 'ID',
        accessor: 'id',
      },
      {
        Header: 'Icon ID',
        accessor: 'icon',
      },
      {
        Header: 'Cost',
        accessor: 'cost',
      },
      {
        Header: 'Is available if capitulated?',
        accessor: 'availableIfCapitulated',
        Cell: ({ value: availableIfCapitulated }) => (
          <>
            <Checkbox checked={availableIfCapitulated} style={{ margin: 0 }} readOnly />
          </>
        ),
      },
    ],
    [],
  );
  const tableInstance = useTable({ columns, data });

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    tableInstance;

  return (
    <table
      width="100%"
      className="bp4-html-table bp4-html-table-striped"
      {...getTableProps()}
    >
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
        {
          // Loop over the table rows
          rows.map((row) => {
            // Prepare the row for display
            prepareRow(row);
            return (
              // Apply the row props
              <tr {...row.getRowProps()}>
                {
                  // Loop over the rows cells
                  row.cells.map((cell) => {
                    // Apply the cell props
                    return (
                      <td {...cell.getCellProps()}>
                        {
                          // Render the cell contents
                          cell.render('Cell')
                        }
                      </td>
                    );
                  })
                }
              </tr>
            );
          })
        }
      </tbody>
    </table>
  );
};

export { FocusTable };
