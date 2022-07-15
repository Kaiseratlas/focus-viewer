import React, { FC } from 'react';
import { Button, ButtonGroup, Navbar } from '@blueprintjs/core';

import styles from './Pagination.module.scss';

interface Props {
  data: any[];
  currentPage: number;
  limit?: number;
  onPageChange: (page: number) => void;
}

const Pagination: FC<Props> = (props) => {
  const { data, currentPage, limit = 25, onPageChange } = props;
  const pagesCount = Math.round(data.length / limit);

  return (
    <div className={styles.pagination}>
      <Navbar.Group>Total: {data.length}</Navbar.Group>
      <Navbar.Group align="right">
        <ButtonGroup large>
          <Button
            icon="caret-left"
            disabled={currentPage === 1}
            onClick={() => onPageChange(currentPage - 1)}
          />
          {Array.from(Array(pagesCount).keys()).map((n) => (
            <Button
              key={n}
              text={n + 1}
              active={n + 1 === currentPage}
              onClick={() => onPageChange(n + 1)}
            />
          ))}
          <Button
            icon="caret-right"
            disabled={currentPage + 1 > pagesCount}
            onClick={() => onPageChange(currentPage + 1)}
          />
        </ButtonGroup>
      </Navbar.Group>
    </div>
  );
};

export default Pagination;
