import React, { FC, useEffect } from 'react';
import { ItemListPredicate, ItemRenderer, Select2 } from '@blueprintjs/select';
import { useDispatch, useSelector } from 'react-redux';
import { Button, MenuItem, Tag } from '@blueprintjs/core';
import Highlighter from 'react-highlight-words';

import {
  fetchReleases,
  Release,
  useSelectedRelease,
} from '../../features/releases';
import { AppDispatch, RootState } from '../store';
import {
  selectAllReleases,
  selectRelease,
} from '../../features/releases/releases.slice';

import styles from './ReleaseSelect.module.scss';

const Select = Select2.ofType<Release>();

export const releaseRenderer: ItemRenderer<Release> = (
  release,
  { handleClick, handleFocus, modifiers, query },
) => {
  if (!modifiers.matchesPredicate) {
    return null;
  }
  return (
    <MenuItem
      disabled={modifiers.disabled}
      key={release.version}
      onClick={handleClick}
      onFocus={handleFocus}
      labelElement={
        <>
          {release.tags?.map((tag) => (
            <Tag key={tag} intent={tag === 'alpha' ? 'danger' : 'warning'}>
              {tag}
            </Tag>
          ))}
        </>
      }
      text={
        <>
          <Highlighter
            searchWords={[query]}
            autoEscape
            textToHighlight={`${release.name ? `'${release.name}'` : ''} ${
              release.version
            }`}
          />
        </>
      }
    />
  );
};

export const releaseListPredicate: ItemListPredicate<Release> = (
  query,
  releases,
) => {
  if (!query) {
    return releases.slice(0, 7);
  }
  return releases
    .filter((release) =>
      [release.version, release.name]
        .map((value) => value?.toLowerCase())
        .some((value) => value?.includes(query.toLowerCase())),
    )
    .slice(0, 7);
};

const ReleaseSelect: FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const releases = useSelector(selectAllReleases);
  const { error } = useSelector((state: RootState) => state.releases);
  const selected = useSelectedRelease();

  useEffect(() => {
    dispatch(fetchReleases());
  }, []);

  return (
    <Select
      items={releases}
      itemRenderer={releaseRenderer}
      itemListPredicate={releaseListPredicate}
      onItemSelect={(release) => dispatch(selectRelease(release))}
      popoverProps={{ matchTargetWidth: true, transitionDuration: 0 }}
    >
      <Button
        outlined
        rightIcon="caret-down"
        intent={error ? 'danger' : 'none'}
        className={styles['release-select']}
      >
        {selected
          ? `${selected.name ? `'${selected.name}'${selected.version}` : ''}`
          : 'none'}
      </Button>
    </Select>
  );
};

export { ReleaseSelect };
