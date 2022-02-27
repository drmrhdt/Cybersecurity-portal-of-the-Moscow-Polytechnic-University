import { combineReducers, configureStore } from '@reduxjs/toolkit';

import { injectStore } from '../services/AxiosInstance';
import * as reducers from './reducers';

const rootReducer = combineReducers(reducers);

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
  });
};

const store = setupStore();
injectStore(store);

export { store };

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
