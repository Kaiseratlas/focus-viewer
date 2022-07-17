import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import logger from 'redux-logger';

import { focusesSlice, sharedFocusesSlice } from '../features/focuses';
import treesReducer from '../features/trees/trees.slice';
import releasesReducer from '../features/releases/releases.slice';
import focusFiltersReducer from '../features/focus-filters/focus-filters.slice';

import rootSaga from './root.saga';

const sagaMiddleware = createSagaMiddleware();
export const store = configureStore({
  reducer: {
    focuses: focusesSlice.reducer,
    sharedFocuses: sharedFocusesSlice.reducer,
    trees: treesReducer,
    releases: releasesReducer,
    focusFilters: focusFiltersReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
      thunk: false,
    })
      .concat(logger)
      .concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
