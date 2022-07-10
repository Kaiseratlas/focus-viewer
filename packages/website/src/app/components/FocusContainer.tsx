import React, { FC, useMemo } from 'react';
import { _ReactPixi, Container } from '@inlet/react-pixi';

import { FocusView } from './FocusView';

interface Props extends _ReactPixi.IContainer {
  focus: any;
  allFocuses: any[];
  onMount: (focusId: string, current: any) => void;
}

const FocusContainer: FC<Props> = (props) => {
  const { focus, allFocuses, onMount, ...containerProps } = props;

  const childFocuses = useMemo(
    () => allFocuses.filter((x) => x.relativePositionId === focus.id) ?? [],
    [focus, allFocuses],
  );

  return (
    <Container position={[focus.x * 95, focus.y * 140]} {...containerProps}>
      <FocusView data={focus} onMount={onMount} />
      {childFocuses.map((childFocus) => (
        <FocusContainer
          key={childFocus.id}
          allFocuses={allFocuses}
          focus={childFocus}
          onMount={onMount}
        />
      ))}
    </Container>
  );
};

export { FocusContainer };
