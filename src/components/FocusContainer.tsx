import React, {
  FC,
  Ref,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import {
  _ReactPixi,
  Container,
  Graphics,
  Sprite,
  Text,
} from '@inlet/react-pixi';
import { debugCoordsStyle, focusNameStyle } from '../const';
import * as PIXI from 'pixi.js';
import focusUnavailableBackground from '../images/focus_unavailable_bg.png';

interface Props extends _ReactPixi.IContainer {
  focus: any;
  allFocuses: any[];
  onMount: (focusId: string, current: any) => void;
}

const FocusContainer: FC<Props> = (props) => {
  const { focus, allFocuses, onMount, ...containerProps } = props;
  const ref = useRef<PIXI.Container>(null);

  useEffect(() => {
    if (ref.current) {
      onMount(focus.id, ref.current);
    }
  }, [ref.current]);
  const draw = useCallback(
    (g: PIXI.Graphics) => {
      g.clear();
      g.lineStyle(1, 0xff00ff, 1);
      g.drawRect(-82, -60, 164, 140);
    },
    [props],
  );
  const draw2 = useCallback(
    (g: PIXI.Graphics) => {
      // g.clear();
      g.lineStyle(2, 0x8ea2b6, 1);
      g.lineTo(0, 100);
    },
    [props],
  );

  const childFocuses =
    allFocuses?.filter((x) => x.relativePositionId === focus.id) ?? [];

  return (
    <Container
      ref={ref}
      position={[focus.x * 95, focus.y * 140]}
      {...containerProps}
    >
      <Graphics draw={draw2} />
      <Container position={[0, 50]}>
        <Sprite anchor={0.5} image={focusUnavailableBackground} />
        <Text anchor={0.5} y={3} text={focus.name} style={focusNameStyle} />
      </Container>
      <Sprite anchor={0.5} image={`./assets/0.20.1/icons/${focus.icon}.png`} />
      {/*<Graphics draw={draw} />*/}
      {childFocuses.map((f) => {
        return (
          <FocusContainer
            key={f.id}
            allFocuses={allFocuses}
            focus={f}
            onMount={onMount}
          />
        );
      })}
      {/*<Text*/}
      {/*  anchor={[0.5, 0]}*/}
      {/*  y={-55}*/}
      {/*  text={`x: ${focus.x}, y: ${focus.y}`}*/}
      {/*  style={debugCoordsStyle}*/}
      {/*/>*/}
    </Container>
  );
};

export { FocusContainer };
