import React, { FC, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { Column } from 'react-table';
import { useNavigate } from 'react-router-dom';

import { selectAllTrees } from '../../features/trees/trees.slice';
import { Table } from '../../app/components/Table';
import { Tree } from '../../features/trees';
import { Breadcrumbs } from '../../app/components/Breadcrumbs/Breadcrumbs';

import type { IBreadcrumbProps } from '@blueprintjs/core';

const BREADCRUMBS: IBreadcrumbProps[] = [
  { href: '/trees', text: 'Focus Trees' },
];

const TreesListPage: FC = () => {
  const trees = useSelector(selectAllTrees);
  const navigate = useNavigate();

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
      {
        Header: 'Focus Count',
        accessor: 'focusCount',
      },
      {
        Header: 'Shared Branches Count',
        accessor: 'sharedFocusIds',
        Cell: ({ value }) => value.length,
      },
    ],
    [],
  );

  return (
    <>
      <Breadcrumbs items={BREADCRUMBS} />
      <Table<Tree>
        columns={columns}
        data={trees}
        striped
        interactive
        onRowClick={(row) =>
          navigate({
            pathname: `/trees/${row.original.id}`,
          })
        }
      />
    </>
  );
};

export default TreesListPage;
