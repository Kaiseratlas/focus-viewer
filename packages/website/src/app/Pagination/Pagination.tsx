import React, { FC } from 'react';
import { Button, ButtonGroup, Navbar } from '@blueprintjs/core';
import { UsePaginationInstanceProps } from 'react-table';

import styles from './Pagination.module.scss';

interface Props extends Omit<UsePaginationInstanceProps<any>, 'setPageSize'> {
  data: any[];
  currentPage: number;
}

const Pagination: FC<Props> = (props) => {
  const {
    data,
    currentPage,
    canNextPage,
    pageCount,
    canPreviousPage,
    previousPage,
    nextPage,
    gotoPage,
  } = props;

  return (
    <div className={styles.pagination}>
      <Navbar.Group>Total: {data.length}</Navbar.Group>
      <Navbar.Group align="right">
        <ButtonGroup large>
          <Button
            icon="caret-left"
            disabled={!canPreviousPage}
            onClick={previousPage}
          />
          {Array.from(Array(pageCount).keys()).map((n) => (
            <Button
              key={n}
              text={n + 1}
              active={n === currentPage}
              onClick={() => gotoPage(n)}
            />
          ))}
          <Button
            icon="caret-right"
            disabled={!canNextPage}
            onClick={nextPage}
          />
        </ButtonGroup>
      </Navbar.Group>
    </div>
  );
};

export default Pagination;
