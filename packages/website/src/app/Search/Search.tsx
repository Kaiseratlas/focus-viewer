import React, { FC, useEffect } from 'react';
import { InputGroup, Menu, MenuItem } from '@blueprintjs/core';
import { useFormik } from 'formik';
import { ItemListPredicate, ItemRenderer, Suggest2 } from '@blueprintjs/select';
import { useDispatch, useSelector } from 'react-redux';
import Highlighter from 'react-highlight-words';
import {
  useNavigate,
  useSearchParams,
  createSearchParams,
} from 'react-router-dom';

import { fetchTrees, Tree } from '../../features/trees';
import { selectAllTrees } from '../../features/trees/trees.slice';
import { AppDispatch, RootState } from '../store';

import styles from './Search.module.scss';

const TreeSuggest = Suggest2.ofType<Tree>();

export const treeListPredicate: ItemListPredicate<Tree> = (query, trees) => {
  if (!query) {
    return trees.slice(0, 7);
  }
  return trees
    .filter((tree) =>
      [tree.id, tree.name]
        .map((value) => value?.toLowerCase())
        .some((value) => value?.includes(query.toLowerCase())),
    )
    .slice(0, 7);
};

export const treeRenderer: ItemRenderer<Tree> = (
  tree,
  { handleClick, handleFocus, modifiers, query },
) => {
  if (!modifiers.matchesPredicate) {
    return null;
  }
  return (
    <MenuItem
      disabled={modifiers.disabled}
      key={tree.id}
      onClick={handleClick}
      onFocus={handleFocus}
      text={
        <Highlighter
          searchWords={[query]}
          autoEscape
          textToHighlight={tree.name ?? tree.id}
        />
      }
    />
  );
};

const Search: FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { loading } = useSelector((state: RootState) => state.trees);
  const { values, handleChange, handleSubmit, handleReset } = useFormik({
    initialValues: {
      term: '',
    },
    onSubmit({ term }) {
      console.log('term', term);
    },
  });

  useEffect(() => {
    dispatch(fetchTrees({ version: '0.20.1' }));
  }, []);

  const trees = useSelector(selectAllTrees);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const currentMode = searchParams.get('mode');

  useEffect(() => {
    handleSubmit();
  }, [values.term]);

  return (
    <form onSubmit={handleSubmit} onReset={handleReset}>
      <TreeSuggest
        selectedItem={null}
        disabled={loading}
        className={styles.search}
        items={trees}
        onItemSelect={(tree) =>
          navigate({
            pathname: `/trees/${tree.id}`,
            search: currentMode
              ? createSearchParams({ mode: currentMode }).toString()
              : '',
          })
        }
        itemListPredicate={treeListPredicate}
        itemRenderer={treeRenderer}
        inputValueRenderer={(tree) => tree.name}
        popoverProps={{
          position: 'bottom',
          matchTargetWidth: true,
          transitionDuration: 0,
          hasBackdrop: true,
          backdropProps: {
            style: {
              marginTop: 50,
            },
          },
        }}
        inputProps={{ leftIcon: 'search' }}
      />
    </form>
  );
};

export { Search };
