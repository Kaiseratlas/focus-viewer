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
  useApp,
} from '@inlet/react-pixi';
import * as PIXI from 'pixi.js';

import { debugCoordsStyle, focusNameStyle, focusNameStyle2 } from '../const';
import focusUnavailableBackground from '../images/focus_unavailable_bg.png';
import focusCanStartBackground from '../images/focus_can_start_bg.png';
import { FocusView } from './FocusView';

interface Props extends _ReactPixi.IContainer {
  focus: any;
  allFocuses: any[];
  onMount: (focusId: string, current: any) => void;
}

const FocusContainer: FC<Props> = (props) => {
  const { focus, allFocuses, onMount, ...containerProps } = props;

  // app.loader.onError.add((error, loader, resource) => {
  //   console.log('ccc', error, loader, resource);
  //   return {};
  // });

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

  const handleClick = (...args: any) => console.log('click', ...args);

  return (
    <>
      <Container position={[focus.x * 95, focus.y * 140]} {...containerProps}>
        <FocusView data={focus} onMount={onMount} />
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
