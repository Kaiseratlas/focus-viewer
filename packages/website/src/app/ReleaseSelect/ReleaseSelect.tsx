import React, { FC, useEffect, useMemo, useState } from 'react';
import { ItemListPredicate, ItemRenderer, Select2 } from '@blueprintjs/select';
import { useDispatch, useSelector } from 'react-redux';
import {
  Button,
  ButtonGroup,
  Menu,
  MenuDivider,
  MenuItem,
  Navbar,
  Tag,
} from '@blueprintjs/core';
import Highlighter from 'react-highlight-words';
import { useSearchParams } from 'react-router-dom';
import classNames from 'classnames';

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
  const [showAll, setShowAll] = useState(true);
  const [asc, setAsc] = useState(false);

  useEffect(() => {
    dispatch(fetchReleases());
  }, []);

  const [searchParams, setSearchParams] = useSearchParams();
  const version = searchParams.get('v');

  useEffect(() => {
    if (version) {
      dispatch(selectRelease({ version } as any));
    }
  }, [version]);

  useEffect(() => {
    if (selected) {
      setSearchParams({ v: selected.version });
    }
  }, [selected]);

  const filteredReleases = useMemo(
    () =>
      releases
        .filter((release) => (showAll ? true : release.isFinal))
        .sort((a, b) =>
          asc
            ? a.date.valueOf() - b.date.valueOf()
            : b.date.valueOf() - a.date.valueOf(),
        ),
    [releases, showAll, asc],
  );

  return (
    <Select
      items={filteredReleases}
      itemRenderer={(
        release,
        { handleClick, handleFocus, modifiers, query },
      ) => {
        if (!modifiers.matchesPredicate) {
          return null;
        }

        const [major, minor = 0, patch = 0] = release.version
          .split('.')
          .map(Number);

        return (
          <>
            {((!asc && release.isFinal) || (asc && patch === 0)) && showAll && (
              <MenuDivider
                title={
                  release.name && (
                    <span
                      className={classNames('bp4-text-muted', {
                        'bp4-text-disabled': modifiers.disabled,
                      })}
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
                        minimal={modifiers.disabled}
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
      }}
      itemListPredicate={releaseListPredicate}
      onItemSelect={(release) => dispatch(selectRelease(release))}
      popoverProps={{ matchTargetWidth: true, transitionDuration: 0 }}
      popoverContentProps={{ className: styles['release-select__popover'] }}
      itemDisabled={({ version }) => version.split('.').map(Number)[1] <= 12}
      itemListRenderer={({ items, renderItem }) => {
        const renderedItems = items.map(renderItem);
        return (
          <>
            <Menu className={styles['release-select__menu']}>
              {renderedItems}
            </Menu>
            <Navbar style={{ padding: '0 10px' }}>
              <Navbar.Group>
                <ButtonGroup minimal>
                  <Button
                    icon={showAll ? 'collapse-all' : 'expand-all'}
                    onClick={() => setShowAll(!showAll)}
                  />
                  <Button
                    icon={asc ? 'sort-numerical-desc' : 'sort-numerical'}
                    onClick={() => setAsc(!asc)}
                  />
                </ButtonGroup>
              </Navbar.Group>
            </Navbar>
          </>
        );
      }}
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
