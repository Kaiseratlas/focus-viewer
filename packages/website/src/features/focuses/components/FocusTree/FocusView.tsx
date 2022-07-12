import React, { FC, useEffect, useMemo, useRef, useState } from 'react';
import { Container, Sprite, Text, useApp } from '@inlet/react-pixi';
import * as PIXI from 'pixi.js';

import { Focus } from '../../typings';

import { focusNameStyle, focusNameStyle2 } from './const';
import focusUnavailableBackground from './focus_unavailable_bg.png';
import unknownGoalIcon from './goal_unknown.png';

interface Props {
  data: Focus;
  onMount?: (...args: any[]) => void;
}

function useResource(resourceId: string) {
  const { loader } = useApp();
  return loader.resources[resourceId] ?? {};
}

const FocusView: FC<Props> = (props) => {
  const { data, onMount } = props;
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
    }),
    [],
  );

  return (
    <>
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
    </>
  );
};

export { FocusView };
