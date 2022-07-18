import React, { FC, useEffect } from 'react';
import { ItemListPredicate, ItemRenderer, Select2 } from '@blueprintjs/select';
import { useDispatch, useSelector } from 'react-redux';
import { Button, MenuDivider, MenuItem, Tag } from '@blueprintjs/core';
import Highlighter from 'react-highlight-words';
import { useSearchParams } from 'react-router-dom';

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

  const [major, minor = 0, patch = 0] = release.version.split('.').map(Number);

  return (
    <>
      {release.isFinal && (
        <MenuDivider
          title={
            release.name && (
              <span
                className="bp4-text-muted"
                style={{
                  textTransform: 'uppercase',
                  letterSpacing: 1,
                  fontWeight: 'normal',
                  fontSize: 11,
                }}
              >
                {release.name} &mdash; {major}.{minor}
              </span>
            )
          }
        />
      )}
      <MenuItem
        disabled={modifiers.disabled}
        key={release.version}
        onClick={handleClick}
        onFocus={handleFocus}
        labelElement={<Tag minimal>{release.version}</Tag>}
        text={
          <>
            <Highlighter
              searchWords={[query]}
              autoEscape
              textToHighlight={release.name ? `${release.name}  ` : '  '}
            />
            <sup>
              {release.tags?.map((tag) => (
                <Tag
                  className={styles['release-select__tag']}
                  key={tag}
                  intent={tag === 'alpha' ? 'danger' : 'warning'}
                >
                  {tag}
                </Tag>
              ))}
            </sup>
          </>
        }
      />
    </>
  );
};

export const releaseListPredicate: ItemListPredicate<Release> = (
  query,
  releases,
) => {
  return releases.filter((release) =>
    [release.version, release.name]
      .map((value) => value?.toLowerCase())
      .some((value) => value?.includes(query.toLowerCase())),
  );
};

const ReleaseSelect: FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const releases = useSelector(selectAllReleases);
  const { error } = useSelector((state: RootState) => state.releases);
  const { selected } = useSelectedRelease();

  useEffect(() => {
    dispatch(fetchReleases());
  }, []);

  const [, setSearchParams] = useSearchParams();

  useEffect(() => {
    if (selected) {
      setSearchParams({ v: selected.version });
    }
  }, [selected]);

  return (
    <Select
      items={releases}
      itemRenderer={releaseRenderer}
      itemListPredicate={releaseListPredicate}
      onItemSelect={(release) => dispatch(selectRelease(release))}
      popoverProps={{ matchTargetWidth: true, transitionDuration: 0 }}
      popoverContentProps={{ className: styles['release-select__popover'] }}
    >
      <Button
        outlined
        rightIcon="caret-down"
        intent={error ? 'danger' : 'none'}
        className={styles['release-select']}
      >
        <div className="bp4-text-overflow-ellipsis" style={{ maxWidth: 200 }}>
          {selected
            ? `${selected.version}: ${
                selected.name ? `'${selected.name}' ` : ''
              }`
            : 'none'}
        </div>
      </Button>
    </Select>
  );
};

export { ReleaseSelect };
