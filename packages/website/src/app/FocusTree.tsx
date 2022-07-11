import React, {
  FC,
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useState,
} from 'react';
import { Container, Graphics, Sprite, Stage } from '@inlet/react-pixi';
import * as PIXI from 'pixi.js';
import { LINE_JOIN } from 'pixi.js';
import { Toaster } from '@blueprintjs/core';

import { Focus } from '../features/focuses';

import Viewport from './components/Viewport';
import mut from './images/focus_link_exclusive.png';
import upDown from './images/focus_link_up_down.png';
import upDownOptional from './images/focus_link_up_down-optional.png';
import leftRight from './images/focus_link_left_right.png';
import { FocusContainer } from './components/FocusContainer';

export const useWindowSize = () => {
  const [size, setSize] = useState([0, 0]);
  useLayoutEffect(() => {
    const updateSize = () => {
      setSize([window.innerWidth, window.innerHeight]);
    };
    window.addEventListener('resize', updateSize);
    updateSize();
    return () => window.removeEventListener('resize', updateSize);
  }, []);
  return size;
};

const toaster = Toaster.create({
  position: 'top-right',
});

interface Props {
  focuses: Focus[];
}

const tex = PIXI.Texture.from(upDownOptional);

const FocusTree: FC<Props> = ({ focuses: data }) => {
  const [app, setApp] = useState<PIXI.Application>();
  const [l, setl] = useState(true);
  const [width, height] = useWindowSize();

  useEffect(() => {
    if (app) {
      data.forEach((focus) => {
        if (!app.loader.resources[focus.icon]) {
          app.loader.add(
            focus.icon,
            `${location.origin}/assets/0.20.1/icons/${focus.icon}.png`,
          );
        }
      });
      app.loader.onError.add((...args) => {
        toaster.show({
          icon: 'media',
          intent: 'danger',
          message: args[0].message,
        });
        console.log(...args);
      });
      app.loader.onStart.add(() => {
        console.log('started');
        setl(false);
      });
      app.loader.onComplete.add(() => {
        console.log('loaded');
        setl(true);
      });
      app.loader.load();
    }
  }, [app]);

  const [refMap, setRefMap] = useState(new Map<string, PIXI.Sprite>());

  const initialFocuses = useMemo(
    () => data?.filter((focus) => !focus.relativePositionId) ?? [],
    [data],
  );

  const draw = useCallback(
    (g: PIXI.Graphics) => {
      if (refMap.size === data.length) {
        g.clear();
        data.forEach((parentFocus) => {
          const dependsFocuses = data.filter((focus) =>
            focus.prerequisiteFocusIds.includes(parentFocus.id),
          );
          const optionalFocuses = data.filter((focus) => {
            const focuses = focus.prerequisiteFocusIds.filter(
              Array.isArray,
            ) as unknown as any[][];
            return focuses.some((f) => f.includes(parentFocus.id));
          });

          const parentFocusSprite = refMap.get(parentFocus.id);

          if (!parentFocusSprite) {
            return;
          }

          const parentFocusSpritePosition =
            parentFocusSprite.getGlobalPosition();
          g.moveTo(parentFocusSpritePosition.x, parentFocusSpritePosition.y);

          const minY = Math.min(
            ...dependsFocuses
              .concat(...optionalFocuses)
              .map((d) => refMap.get(d.id))
              .map((t) => t?.getGlobalPosition().y ?? 0),
          );

          const y = minY - Math.abs(minY - parentFocusSpritePosition.y) / 2;

          g.lineStyle(2, 0x8ea2b6, 1);

          dependsFocuses.forEach((ff) => {
            const ff2 = refMap.get(ff.id);
            if (ff2) {
              const b2 = ff2.getGlobalPosition();

              g.lineTo(parentFocusSpritePosition.x, y);
              g.lineTo(b2.x, y);
              g.lineTo(b2.x, b2.y);

              g.moveTo(
                parentFocusSpritePosition.x,
                parentFocusSpritePosition.y,
              );
            }
          });



          g.lineStyle(2, 0x8ea2b6, 0.25);


          optionalFocuses.forEach((ff) => {
            const ff2 = refMap.get(ff.id);
            if (ff2) {
              const b2 = ff2.getGlobalPosition();

              g.lineTo(parentFocusSpritePosition.x, y);
              g.lineTo(b2.x, y);
              g.lineTo(b2.x, b2.y);

              g.moveTo(
                parentFocusSpritePosition.x,
                parentFocusSpritePosition.y,
              );
            }
          });
        });
      }
    },
    [refMap.size, data.length],
  );

  const mutuallyExclusiveSprites = useMemo(() => {
    if (refMap.size !== data.length) {
      return [];
    }
    const sprites: any[] = [];
    data.forEach((parentFocus) => {
      const mutuallyExclusiveFocuses = data.filter(
        (focus) =>
          focus.mutuallyExclusive?.focus === parentFocus.id ||
          parentFocus.mutuallyExclusive?.focus?.includes(focus.id),
      );

      if (!mutuallyExclusiveFocuses.length) {
        return;
      }

      const focusSprite = refMap.get(parentFocus.id);
      if (!focusSprite) {
        return;
      }

      const focusSpriteBounds = focusSprite.getGlobalPosition();

      mutuallyExclusiveFocuses.forEach((nextFocus) => {
        if (!nextFocus) {
          return;
        }
        const nextFocusSprite = refMap.get(nextFocus.id);

        if (nextFocusSprite) {
          const nextFocusSpriteBounds = nextFocusSprite.getGlobalPosition();

          const x =
            focusSpriteBounds.x +
            (nextFocusSpriteBounds.x - focusSpriteBounds.x) / 2;
          const y = nextFocusSpriteBounds.y;
          sprites.push(
            <Container
              position={[0, 50]}
              key={`${parentFocus.id}-${nextFocus.id}`}
            >
              <Graphics
                draw={(g) => {
                  g.clear();
                  g.moveTo(focusSpriteBounds.x, focusSpriteBounds.y);
                  g.lineStyle(2, 0xb0cdb0, 0.2);
                  g.lineTo(nextFocusSpriteBounds.x, nextFocusSpriteBounds.y);
                  g.moveTo(focusSpriteBounds.x, focusSpriteBounds.y);
                }}
              />
              <Sprite image={mut} anchor={0.5} position={[x, y]} />
            </Container>,
          );
        }
      });
    });
    console.log('sprites', sprites);
    return sprites;
  }, [refMap.size, data.length]);

  return (
    <Stage
      width={width - 40}
      height={height - 150}
      options={{ antialias: true, backgroundAlpha: 0 }}
      onMount={setApp}
      style={{
        boxShadow:
          'inset 0 0 0 1px rgb(255 255 255 / 20%), 0 1px 1px 0 rgb(17 20 24 / 40%)',
      }}
    >
      <Viewport width={1400} height={1000}>
        <Graphics position={[0, 15]} draw={draw} />
        {mutuallyExclusiveSprites}
        <Container position={[100, 100]}>
          {initialFocuses.map((focus) => (
            <FocusContainer
              key={focus.id}
              focus={focus}
              allFocuses={data}
              onMount={(id, ref) => {
                setRefMap(new Map(refMap.set(id, ref)));
              }}
            />
          ))}
        </Container>
      </Viewport>
    </Stage>
  );
};

export { FocusTree };
