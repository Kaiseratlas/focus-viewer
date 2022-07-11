import React, { FC } from 'react';
import { Card, CardProps, Tag } from '@blueprintjs/core';
import classNames from 'classnames';

import { Focus } from '../../features/focuses';

import styles from './FocusCard.module.scss';

interface Props extends CardProps {
  focus: Focus;
}

const FocusCard: FC<Props> = (props) => {
  const { focus, ...cardProps } = props;

  const iconUrl = `${location.origin}/assets/0.20.1/icons/${focus.icon}.png`;
  return (
    <div>
      <Card className={styles['focus-card']} {...cardProps}>
        <Tag
          className={styles['focus-card__tag']}
          minimal
          intent={focus.cost === 0 ? 'warning' : 'none'}
        >
          {focus.cost} day{focus.cost === 1 ? '' : 's'}
        </Tag>
        <div
          className={styles['focus-card__image']}
          style={{ backgroundImage: `url(${iconUrl})` }}
        />
      </Card>
      <p className={classNames('bp4-text-muted', styles['focus-card__name'])}>
        {focus.name}
      </p>
    </div>
  );
};

export { FocusCard };
