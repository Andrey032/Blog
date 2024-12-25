import { configureStore } from '@reduxjs/toolkit';
import blogsSlice from './blogs/blogsSlice';
import storage from 'redux-persist/lib/storage';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';

const persistConfig = {
  key: 'token',
  storage: storage,
  whitelist: ['token'],
};

const persistedReduser = persistReducer(persistConfig, blogsSlice);

export const store = configureStore({
  reducer: persistedReduser,
  devTools: true,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoreActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
