import React, { FC, useEffect, useMemo, useState } from 'react';
import { _ReactPixi, Container, Stage } from '@inlet/react-pixi';
import * as PIXI from 'pixi.js';
import { Toaster } from '@blueprintjs/core';
import classNames from 'classnames';

import { Focus, FocusId } from '../../typings';
import { FocusFilterId } from '../../../focus-filters';

import Viewport from './Viewport';
import { FocusContainer } from './FocusContainer';
import styles from './FocusTree.module.scss';
import { FocusLinks } from './FocusLinks';

const toaster = Toaster.create({
  position: 'top-right',
});

interface Props extends _ReactPixi.IStage {
  baseAssetsUrl: string;
  focuses: Focus[];
  selectedBranches: FocusId[];
  searchFilters: FocusFilterId[];
  onMount?: _ReactPixi.IStage['onMount'];
  treeOptions?: {
    showLinks: boolean;
  };
}

const FocusTree: FC<Props> = (props) => {
  const {
    baseAssetsUrl,
    className,
    searchFilters,
    selectedBranches,
    focuses: data,
    onMount,
    treeOptions,
    ...stageProps
  } = props;

  const { showLinks = true } = treeOptions ?? {};

  const [app, setApp] = useState<PIXI.Application>();
  const [, setLoading] = useState(true); // TODO: important: will not rendered without it!

  useEffect(() => {
    if (app) {
      if (onMount) {
        onMount(app);
      }
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

  const focusLinks = useMemo(() => {
    // console.log(refMap.size, data.length);
    // console.log(data.filter((f) => !refMap.has(f.id)));
    // console.log(refMap.get('CHS_national_protection_legacy'))
    return initialFocuses
      .filter((focus) => selectedBranches.includes(focus.id))
      .map((focus) => (
        <FocusLinks
          key={focus.id}
          focus={focus}
          allFocuses={data}
          refMap={refMap}
        />
      ));
  }, [refMap.size, data.length, selectedBranches, initialFocuses]);

  return (
    <Stage
      className={classNames(styles['focus-tree'], className)}
      onMount={setApp}
      {...stageProps}
    >
      <Viewport width={1400} height={1000}>
        {showLinks && focusLinks}
        <Container position={[100, 100]}>
          {initialFocuses.map((focus) => (
            <FocusContainer
              key={focus.id}
              visible={selectedBranches.includes(focus.id)}
              focus={focus}
              allFocuses={data}
              searchFilters={searchFilters}
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
