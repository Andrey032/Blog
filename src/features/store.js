import { configureStore } from '@reduxjs/toolkit';
import blogsSlice from './blogs/blogsSlice';

const store = configureStore({
  reducer: blogsSlice,
  devTools: true,
});

export default store;
