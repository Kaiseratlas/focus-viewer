import React, { FC } from 'react';
import { Column } from 'react-table';

import { Focus } from '../features/focuses';

import { Table } from './components/Table';

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

  return <Table<Focus> columns={columns} data={data} striped />;
};

export { FocusTable };
