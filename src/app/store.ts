import { configureStore } from '@reduxjs/toolkit';
import focusesReducer from '../features/focuses/focusesSlice';
import treesReducer from '../features/trees/treesSlice';
import createSagaMiddleware from 'redux-saga';
import rootSaga from '../app/root.saga';
import logger from 'redux-logger';

const sagaMiddleware = createSagaMiddleware();
export const store = configureStore({
  reducer: {
    focuses: focusesReducer,
    trees: treesReducer,
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
