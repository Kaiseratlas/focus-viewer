import React, { FC, useEffect } from 'react';
import { ItemListPredicate, ItemRenderer, Select2 } from '@blueprintjs/select';
import { useDispatch, useSelector } from 'react-redux';
import { Button, MenuItem, Tag } from '@blueprintjs/core';
import Highlighter from 'react-highlight-words';

import { fetchReleases, Release } from '../../features/releases';
import { AppDispatch } from '../store';
import { selectAllReleases } from '../../features/releases/releases.slice';

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
            textToHighlight={`${release.version} ${
              release.name ? `'${release.name}'` : ''
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

  useEffect(() => {
    dispatch(fetchReleases());
  }, []);
  return (
    <Select
      items={releases}
      itemRenderer={releaseRenderer}
      itemListPredicate={releaseListPredicate}
      onItemSelect={() => {

      }}
    >
      <Button outlined rightIcon="caret-down">
        0.20.1
      </Button>
    </Select>
  );
};

export { ReleaseSelect };
