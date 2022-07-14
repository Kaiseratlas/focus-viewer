import { FC, useCallback, useMemo } from 'react';
import * as PIXI from 'pixi.js';

import { Focus } from '../../typings';
import { FocusLinkExclusive } from '../FocusLinkExclusive';
import { Graphics } from "@inlet/react-pixi";

interface Props {
  focus: Focus;
  allFocuses: Focus[];
  refMap: any;
}

const FocusLinks: FC<Props> = (props) => {
  const { focus: parentFocus, allFocuses, refMap } = props;

  const mutuallyExclusiveFocuses = useMemo(
    () =>
      allFocuses.filter(
        (focus) =>
          focus.mutuallyExclusive?.focus === parentFocus.id ||
          parentFocus.mutuallyExclusive?.focus?.includes(focus.id),
      ),
    [parentFocus, allFocuses],
  );

  const dependsFocuses = useMemo(
    () =>
      allFocuses.filter((focus) =>
        focus.prerequisiteFocusIds.includes(parentFocus.id),
      ),
    [parentFocus, allFocuses],
  );

  const childFocuses = useMemo(
    () => allFocuses.filter((f) => f.relativePositionId === parentFocus.id),
    [parentFocus, allFocuses],
  );

  const optionalFocuses = useMemo(
    () =>
      allFocuses.filter((focus) => {
        const focuses = focus.prerequisiteFocusIds.filter(
          Array.isArray,
        ) as unknown as any[][];
        return focuses.some((f) => f.includes(parentFocus.id));
      }),
    [parentFocus, allFocuses],
  );

  const draw = useCallback(
    (g: PIXI.Graphics) => {
      g.clear();

      const parentFocusSprite = refMap.get(parentFocus.id);

      if (!parentFocusSprite) {
        return;
      }

      const parentFocusSpritePosition = parentFocusSprite.getGlobalPosition();
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

          g.moveTo(parentFocusSpritePosition.x, parentFocusSpritePosition.y);
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

          g.moveTo(parentFocusSpritePosition.x, parentFocusSpritePosition.y);
        }
      });
    },
    [refMap.size, dependsFocuses, optionalFocuses],
  );

  const mutuallyExclusiveSprites = useMemo(() => {
    const sprites: any[] = [];

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
    // console.log('sprites', sprites);
    return sprites;
  }, [refMap.size, mutuallyExclusiveFocuses]);

  return (
    <>
      <Graphics position={[0, 15]} draw={draw} />
      {mutuallyExclusiveSprites}
      {childFocuses.map((childFocus) => (
        <FocusLinks
          key={childFocus.id}
          allFocuses={allFocuses}
          focus={childFocus}
          refMap={refMap}
        />
      ))}
    </>
  );
};

export { FocusLinks };
