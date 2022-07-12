import React, { FC, useCallback, useEffect, useMemo, useState } from 'react';
import { _ReactPixi, Container, Graphics, Stage } from '@inlet/react-pixi';
import * as PIXI from 'pixi.js';
import { Toaster } from '@blueprintjs/core';
import classNames from 'classnames';

import { Focus } from '../../typings';
import { FocusLinkExclusive } from '../FocusLinkExclusive';

import Viewport from './Viewport';
import { FocusContainer } from './FocusContainer';
import styles from './FocusTree.module.scss';

const toaster = Toaster.create({
  position: 'top-right',
});

interface Props extends _ReactPixi.IStage {
  baseAssetsUrl: string;
  focuses: Focus[];
}

const FocusTree: FC<Props> = (props) => {
  const { baseAssetsUrl, className, focuses: data, ...stageProps } = props;

  const [app, setApp] = useState<PIXI.Application>();
  const [, setLoading] = useState(true); // TODO: important: will not rendered without it!

  useEffect(() => {
    if (app) {
      app.loader.baseUrl = baseAssetsUrl;
      data.forEach((focus) => {
        if (!app.loader.resources[focus.icon]) {
          app.loader.add(focus.icon, `${focus.icon}.png`);
        }
      });
      app.loader.onError.add((...args) => {
        toaster.show({
          icon: 'media',
          intent: 'danger',
          message: args[0].message,
        });
      });
      app.loader.onStart.add(() => {
        setLoading(true);
      });
      app.loader.onComplete.add(() => {
        setLoading(false);
      });
      app.loader.load();
    }
  }, [app]);

  const [refMap, setRefMap] = useState(new Map<string, PIXI.Sprite>());

  const initialFocuses = useMemo(
    () => data.filter((focus) => !focus.relativePositionId) ?? [],
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

          sprites.push(
            <FocusLinkExclusive
              key={`${parentFocus.id}-${nextFocus.id}`}
              from={[focusSpriteBounds.x, focusSpriteBounds.y]}
              to={[nextFocusSpriteBounds.x, nextFocusSpriteBounds.y]}
            />,
          );
        }
      });
    });
    // console.log('sprites', sprites);
    return sprites;
  }, [refMap.size, data.length]);

  return (
    <Stage
      className={classNames(styles['focus-tree'], className)}
      onMount={setApp}
      {...stageProps}
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

FocusTree.defaultProps = {
  options: { antialias: true, backgroundAlpha: 0 },
};

export default FocusTree;
