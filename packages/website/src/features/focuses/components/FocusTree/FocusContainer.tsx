import React, { FC, useMemo } from 'react';
import { _ReactPixi, Container } from '@inlet/react-pixi';

import { Focus } from '../../typings';

import { FocusView } from './FocusView';

interface Props extends _ReactPixi.IContainer {
  focus: Focus;
  allFocuses: any[];
  searchFilters: string[];
  onMount: (focusId: string, current: any) => void;
  onFocusClick?: (focus: Focus) => void;
}

const FocusContainer: FC<Props> = (props) => {
  const { focus, allFocuses, searchFilters, onMount, onFocusClick, ...containerProps } =
    props;

  const childFocuses = useMemo(
    () => allFocuses.filter((x) => x.relativePositionId === focus.id) ?? [],
    [focus, allFocuses],
  );

  return (
    <Container position={[focus.x * 95, focus.y * 140]} {...containerProps}>
      <FocusView
        data={focus}
        onMount={onMount}
        onClick={onFocusClick}
        matched={focus.searchFilters.some((focusFilterId) =>
          searchFilters.includes(focusFilterId),
        )}
      />
      {childFocuses.map((childFocus) => (
        <FocusContainer
          key={childFocus.id}
          allFocuses={allFocuses}
          focus={childFocus}
          onMount={onMount}
          onFocusClick={onFocusClick}
          searchFilters={searchFilters}
        />
      ))}
    </Container>
  );
};

export { FocusContainer };
