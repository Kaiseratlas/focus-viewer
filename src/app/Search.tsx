import React, { FC, useEffect } from 'react';
import { InputGroup, Menu, MenuItem } from '@blueprintjs/core';
import { useFormik } from 'formik';
import { ItemListPredicate, ItemRenderer, Suggest2 } from '@blueprintjs/select';
import { useDispatch, useSelector } from 'react-redux';
import Highlighter from 'react-highlight-words';
import { useNavigate } from 'react-router-dom';

import { fetchTrees, Tree } from '../features/trees';
import { selectAllTrees } from '../features/trees/trees.slice';

import styles from './Search.module.scss';
import { AppDispatch, RootState } from './store';

const TreeSuggest = Suggest2.ofType<Tree>();

export const treeListPredicate: ItemListPredicate<Tree> = (query, trees) => {
  if (!query) {
    return trees;
  }
  return trees.filter((tree) =>
    [tree.id, tree.name]
      .map((value) => value?.toLowerCase())
      .some((value) => value?.includes(query.toLowerCase())),
  );
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
        onItemSelect={(tree) => navigate(`/trees/${tree.id}`)}
        itemListPredicate={treeListPredicate}
        itemRenderer={treeRenderer}
        inputValueRenderer={(tree) => tree.name}
        popoverProps={{ position: 'bottom', matchTargetWidth: true }}
        inputProps={{ leftIcon: 'search' }}
      />
    </form>
  );
};

export { Search };
