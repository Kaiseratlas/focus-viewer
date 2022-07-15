import React, { FC, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { Column } from 'react-table';

import { selectAllTrees } from '../../features/trees/trees.slice';
import { Table } from '../Table';
import { Tree } from '../../features/trees';

const TreesPage: FC = () => {
  const trees = useSelector(selectAllTrees);

  const columns = useMemo<Column<Tree>[]>(
    () => [
      {
        Header: 'Name',
        accessor: 'name',
      },
      {
        Header: 'Tree ID',
        accessor: 'id',
      },
    ],
    [],
  );

  return <Table<Tree> columns={columns} data={trees} striped interactive />;
};

export default TreesPage;
