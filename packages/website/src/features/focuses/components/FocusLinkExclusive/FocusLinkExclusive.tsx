import React, { FC, useCallback } from 'react';
import { Container, Graphics, Sprite } from '@inlet/react-pixi';
import * as PIXI from 'pixi.js';

import mut from './focus_link_exclusive.png';

interface Props {
  from: [number, number];
  to: [number, number];
}

const FocusLinkExclusive: FC<Props> = (props) => {
  const { from, to } = props;

  const x = from[0] + (to[0] - from[0]) / 2;
  const y = to[1];

  const draw = useCallback(
    (g: PIXI.Graphics) => {
      g.clear();
      g.moveTo(from[0], from[1]);
      g.lineStyle(2, 0xb0cdb0, 0.2);
      g.lineTo(to[0], to[1]);
    },
    [from, to],
  );

  return (
    <Container position={[0, 54]}>
      <Graphics draw={draw} />
      <Sprite image={mut} anchor={0.5} position={[x, y]} />
    </Container>
  );
};

export default FocusLinkExclusive;
