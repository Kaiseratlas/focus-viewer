import React, { FC, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { Column } from 'react-table';
import { useNavigate } from 'react-router-dom';
import { Breadcrumb, Breadcrumbs, IBreadcrumbProps } from '@blueprintjs/core';

import { selectAllTrees } from '../../features/trees/trees.slice';
import { Table } from '../Table';
import { Tree } from '../../features/trees';

const BREADCRUMBS: IBreadcrumbProps[] = [
  { href: '/trees', text: 'Focus Trees' },
];

const TreesPage: FC = () => {
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
    ],
    [],
  );

  return (
    <>
      <div style={{ padding: 10 }}>
        <Breadcrumbs
          currentBreadcrumbRenderer={({ text, ...restProps }) => (
            <Breadcrumb {...restProps}>{text}</Breadcrumb>
          )}
          items={BREADCRUMBS}
        />
      </div>
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

export default TreesPage;
