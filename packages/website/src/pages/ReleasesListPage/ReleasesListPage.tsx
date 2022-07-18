import React, { FC } from 'react';
import { IBreadcrumbProps } from '@blueprintjs/core';

import { Breadcrumbs } from '../../app/components/Breadcrumbs/Breadcrumbs';

import { ReleaseTable } from './ReleaseTable';

const BREADCRUMBS: IBreadcrumbProps[] = [
  { href: '/releases', text: 'Releases', current: true },
];

const ReleasesListPage: FC = () => {
  return (
    <>
      <Breadcrumbs items={BREADCRUMBS} />
      <ReleaseTable />
    </>
  );
};

export default ReleasesListPage;
