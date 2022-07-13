import React, { FC } from 'react';
import { Column } from 'react-table';
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

  return <Table<Release> columns={columns} data={data} interactive striped />;
};

export default ReleaseTable;
