import React, { Ref, useEffect, useMemo, useState } from 'react';
import { Container, Graphics, Stage } from '@inlet/react-pixi';
import { useQuery } from 'react-query';
import { FocusContainer } from './components/FocusContainer';
import Viewport from './components/Viewport';
import * as PIXI from 'pixi.js';
import mut from './images/focus_link_exclusive.png';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from './store';
import {
  fetchFocuses,
  selectAllFocuses,
} from '../features/focuses/focusesSlice';

function App() {
  const data = useSelector(selectAllFocuses);

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchFocuses({ treeId: 'LEB_focus', version: '0.20.1' }));
  }, []);

  const focusMap = useMemo(() => {
    if (!data) {
      return null;
    }
    return new Map(data.map((focus) => [focus.id, focus]));
  }, [data]);

  const refMap = new Map<string, PIXI.Sprite>();

  const initialFocuses = useMemo(
    () => data?.filter((focus) => !focus.relativePositionId) ?? [],
    [data],
  );

  return (
    <Stage width={1400} height={1000} options={{ backgroundColor: 0x1d2021 }}>
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
                    //console.log('222')
                    refMap.set(id, ref);
                  }}
                />
              );
            })}
        </Container>
      </Viewport>
    </Stage>
  );
}

export default App;
