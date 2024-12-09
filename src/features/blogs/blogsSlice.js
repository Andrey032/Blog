import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { URL } from '../../utils/constants';

export const loadBlogs = createAsyncThunk(
  '@@blogs/loadBlogs',
  async (num, { rejectWithValue, dispatch }) => {
    try {
      dispatch(setLoading(true));
      const response = await fetch(`${URL}/articles?limit=5&offset=${num}`);
      if (!response.ok) throw new Error(response.status);
      return await response.json();
    } catch (error) {
      return rejectWithValue(`Ошибка сервера ${error}`);
    }
  }
);

const initialState = {
  articles: [],
  articlesCount: 0,
  isLoading: false,
  error: null,
  isLike: false,
  currentPage: 1,
};

const blogsSlice = createSlice({
  name: '@@blog',
  initialState: initialState,
  reducers: {
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadBlogs.fulfilled, (state, action) => {
        const { articles, articlesCount } = action.payload;
        state.isLoading = false;
        state.articles = [...articles];
        state.articlesCount = articlesCount;
      })
      .addMatcher(
        (action) => action.type.endsWith('/pending'),
        (state) => {
          state.isLoading = false;
          state.error = null;
        }
      )
      .addMatcher(
        (action) => action.type.endsWith('/rejected'),
        (state, action) => {
          console.log(action);

          state.isLoading = false;
          state.error = action.payload;
        }
      );
  },
});

export const { setLoading } = blogsSlice.actions;

export default blogsSlice.reducer;

export const articlesSelector = (state) => state.articles;
