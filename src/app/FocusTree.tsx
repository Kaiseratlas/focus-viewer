import { FC, useMemo, useState, useEffect } from 'react';
import { Container, Graphics, Stage } from '@inlet/react-pixi';
import * as PIXI from 'pixi.js';
import { useDispatch, useSelector } from 'react-redux';
import { Toaster } from '@blueprintjs/core';

import { fetchFocuses, Focus, selectAllFocuses } from '../features/focuses';

import Viewport from './components/Viewport';
import mut from './images/focus_link_exclusive.png';
import { FocusContainer } from './components/FocusContainer';
import { AppDispatch } from './store';

const toaster = Toaster.create({
  position: 'top-right',
});

interface Props {
  focuses: Focus[];
}

const FocusTree: FC<Props> = ({ focuses: data }) => {
  const [app, setApp] = useState<PIXI.Application>();
  const [l, setl] = useState(true);

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
      //app.loader.load();
    }
  }, [app]);

  const refMap = new Map<string, PIXI.Sprite>();

  const initialFocuses = useMemo(
    () => data?.filter((focus) => !focus.relativePositionId) ?? [],
    [data],
  );

  return (
    <Stage
      width={window.innerWidth}
      height={window.innerHeight}
      options={{ antialias: true, backgroundAlpha: 0 }}
      onMount={setApp}
    >
      <Viewport width={1400} height={1000}>
        <Graphics
          position={[0, 15]}
          draw={(g) => {
            setTimeout(async () => {
              g.clear();

              data?.forEach((focus) => {
                const dependsFocuses =
                  data?.filter((x) =>
                    x.prerequisiteFocusIds.includes(focus.id),
                  ) ?? [];

                const mutuallyExclusiveFocuses =
                  data?.filter((x) =>
                    focus.mutuallyExclusive?.focus.includes(x.id),
                  ) ?? [];

                const f = refMap.get(focus.id);
                if (f) {
                  const b = f.getBounds();
                  g.moveTo(b.x, b.y);

                  mutuallyExclusiveFocuses.forEach(async (ff, i) => {
                    const mf2 = refMap.get(ff.id);
                    if (mf2) {
                      const b2 = mf2.getBounds();
                      //if (i !== mutuallyExclusiveFocuses.length - 1) {
                      g.drawRect(b2.x, b2.y, 100, 32);
                      g.beginTextureFill({
                        texture: await PIXI.Texture.fromURL(mut),
                      });
                      //}

                      g.moveTo(b.x, b.y);
                    }
                  });
                  //

                  g.lineStyle(2, 0x8ea2b6, 1);

                  const minY = Math.min(
                    ...dependsFocuses
                      .map((d) => refMap.get(d.id))
                      .map((t) => t?.getBounds().y ?? 0),
                  );

                  const maxY = Math.max(
                    ...dependsFocuses
                      .map((d) => refMap.get(d.id))
                      .map((t) => t?.getBounds().y ?? 0),
                  );

                  dependsFocuses.forEach((ff) => {
                    const ff2 = refMap.get(ff.id);
                    if (ff2) {
                      const b2 = ff2.getBounds();
                      g.lineTo(b.x, minY - Math.abs(minY - b.y) / 2);
                      g.lineTo(b2.x, minY - Math.abs(minY - b.y) / 2);
                      g.lineTo(b2.x, b2.y);
                      g.moveTo(b.x, b.y);
                    }
                  });
                }
              });
            }, 0);
          }}
        />
        <Container position={[100, 100]}>
          {data &&
            initialFocuses.map((focus) => {
              return (
                <FocusContainer
                  key={focus.id}
                  focus={focus}
                  allFocuses={data}
                  // refs={refs}
                  onMount={(id, ref) => {
                    //console.log(id, ref);
                    console.log('222');
                    refMap.set(id, ref);
                  }}
                />
              );
            })}
        </Container>
      </Viewport>
    </Stage>
  );
};

export { FocusTree };
