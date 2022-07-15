import React, { FC, useEffect, useMemo, useRef, useState } from 'react';
import {
  Container,
  Sprite,
  Text,
  useApp,
  withFilters,
} from '@inlet/react-pixi';
import * as PIXI from 'pixi.js';
import { DropShadowFilter } from '@pixi/filter-drop-shadow';

import { Focus } from '../../../typings';
import { focusNameStyle, focusNameStyle2 } from '../const';
import focusUnavailableBackground from '../focus_unavailable_bg.png';
import unknownGoalIcon from '../goal_unknown.png';
import { debug } from '../utils';

interface Props {
  data: Focus;
  onMount?: (...args: any[]) => void;
  matched: boolean;
}

function useResource(resourceId: string) {
  const { loader } = useApp();
  return loader.resources[resourceId] ?? {};
}

const Filter = withFilters(Container, {
  dropShadow: DropShadowFilter,
});

const FocusView: FC<Props> = (props) => {
  const { data, onMount, matched } = props;
  const ref = useRef<PIXI.Sprite>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    if (mounted && onMount) {
      onMount(data.id, ref.current);
    }
  }, [mounted]);

  useEffect(() => {
    if (!mounted) {
      setMounted(true);
    }
  }, [ref.current]);

  const [hovered, setHovered] = useState(false);
  const { texture, isComplete, error } = useResource(data.icon);

  const interactiveProps = useMemo(
    () => ({
      interactive: true,
      pointerover: () => setHovered(true),
      pointerout: () => setHovered(false),
      pointerdown: () => console.log(data),
      //pointerdown: () => debug('clicked on focus: %o', data),
    }),
    [],
  );

  return (
    <Filter
      dropShadow={{
        blur: 5,
        alpha: 0.75,
        distance: 0,
        color: 0xffffff,
        enabled: matched,
      }}
    >
      <Container position={[0, 50]} {...interactiveProps}>
        <Sprite anchor={0.5} image={focusUnavailableBackground} />
        <Text
          anchor={0.5}
          y={3}
          text={data.name}
          style={hovered ? focusNameStyle2 : focusNameStyle}
        />
      </Container>
      <Sprite
        ref={ref}
        anchor={0.5}
        image={unknownGoalIcon}
        {...interactiveProps}
        {...(isComplete && !error ? { texture } : {})}
      />
    </Filter>
  );
};

export default FocusView;
