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

  const draw = useCallback(
    (g: PIXI.Graphics) => {
      g.clear();
      g.lineStyle(1, 0xff00ff, 1);
      g.drawRect(-82, -60, 164, 140);
    },
    [props],
  );

  const dependsFocuses =
    allFocuses?.filter((x) => x.prerequisiteFocusIds.includes(focus.id)) ?? [];

  const draw2 = useCallback(
    (g: PIXI.Graphics) => {
      g.clear();
      g.lineStyle(2, 0x8ea2b6, 1);
      g.lineTo(0, 100);
    },
    [props],
  );

  // const draw22 = useCallback(
  //   (g: PIXI.Graphics) => {
  //     g.clear();
  //
  //     if (focus.id === 'LEB_independence_achieved') {
  //       const xxx = refs?.get(focus.id);
  //
  //       if (!xxx) {
  //         return;
  //       }
  //
  //       const cbounds = xxx.getGlobalPosition();
  //
  //       console.log('cbounds', cbounds);
  //       console.log('dependsFocuses', dependsFocuses);
  //
  //       g.lineStyle(1, 0x8ea2b6, 1);
  //
  //       if (refs?.size) {
  //         for (const f of dependsFocuses) {
  //           const fref = refs.get(f.id);
  //           if (!fref) {
  //             return;
  //           }
  //           const { x, y } = fref.getLocalBounds();
  //           //console.log('fref', fref.getBounds());
  //           g.lineTo(x, y + 100);
  //         }
  //       }
  //     }
  //   },
  //   [dependsFocuses, refs, focus],
  // );

  const childFocuses =
    allFocuses?.filter((x) => x.relativePositionId === focus.id) ?? [];

  return (
    <>
      <Container position={[focus.x * 95, focus.y * 140]} {...containerProps}>
        <Container position={[0, 50]}>
          <Sprite anchor={0.5} image={focusUnavailableBackground} />
          <Text anchor={0.5} y={3} text={focus.name} style={focusNameStyle} />
        </Container>
        <Sprite
          ref={(instance) => {
            onMount(focus.id, instance);
          }}
          anchor={0.5}
          image={`./assets/0.20.1/icons/${focus.icon}.png`}
        />
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
        {/*<Graphics anchor={0.5} draw={draw22} />*/}
      </Container>
    </>
  );
};

export { FocusContainer };
