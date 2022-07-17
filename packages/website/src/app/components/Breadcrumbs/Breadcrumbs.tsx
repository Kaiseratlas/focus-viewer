import { FC } from 'react';
import {
  Breadcrumb,
  Breadcrumbs as BlueprintBreadcrumbs,
  IBreadcrumbsProps,
} from '@blueprintjs/core';
import { useNavigate } from 'react-router-dom';

import styles from './Breadcrumbs.module.scss';

const Breadcrumbs: FC<IBreadcrumbsProps> = (props) => {
  const navigate = useNavigate();
  return (
    <BlueprintBreadcrumbs
      className={styles.breadcrumbs}
      breadcrumbRenderer={({ href, ...restProps }) => (
        <Breadcrumb {...restProps} onClick={() => href && navigate(href)} />
      )}
      currentBreadcrumbRenderer={({ href, text, ...restProps }) => (
        <Breadcrumb {...restProps} onClick={() => href && navigate(href)}>
          {text}
        </Breadcrumb>
      )}
      {...props}
    />
  );
};

export { Breadcrumbs };
