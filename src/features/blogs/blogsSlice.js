import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { URL } from '../../utils/constants';

export const loadBlogs = createAsyncThunk(
  '@@blogs/loadBlogs',
  async (offset = 0, { rejectWithValue }) => {
    try {
      const response = await fetch(`${URL}/articles?limit=5&offset=${offset}`);
      if (!response.ok) throw new Error(response.status);
      return await response.json();
    } catch (error) {
      return rejectWithValue(`Ошибка в получении постов ${error}`);
    }
  }
);

// export const loadBlog = createAsyncThunk(
//   '@@blog/loadBlog',
//   async (slug = '', { rejectWithValue }) => {
//     try {
//       const response = await fetch(`${URL}/articles/${slug}`);
//       if (!response.ok) throw new Error(response.status);
//       return await response.json();
//     } catch (error) {
//       return rejectWithValue(`Ошибка в получении поста ${error}`);
//     }
//   }
// );

const initialState = {
  articles: [],
  article: null,
  articlesCount: 0,
  isLoading: false,
  isLoggedIn: true,
  error: null,
  isLike: false,
  currentPage: 1,
  offset: 0,
};

const blogsSlice = createSlice({
  name: '@@blog',
  initialState: initialState,
  reducers: {
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setPage: (state, action) => {
      state.currentPage = action.payload;
      state.offset = action.payload * 5 - 5;
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
      // .addCase(loadBlog.fulfilled, (state, action) => {
      //   state.isLoading = false;
      //   state.article = action.payload.article;
      // })
      .addMatcher(
        (action) => action.type.endsWith('/pending'),
        (state) => {
          state.isLoading = true;
          state.error = null;
        }
      )
      .addMatcher(
        (action) => action.type.endsWith('/rejected'),
        (state, action) => {
          state.isLoading = false;
          state.error = action.payload;
        }
      );
  },
});

export const { setLoading, setPage } = blogsSlice.actions;

export default blogsSlice.reducer;

export const articlesSelector = (state) => state.articles;
export const articlesCountSelector = (state) => state.articlesCount;
export const loadingSelector = (state) => state.isLoading;
export const errorSelector = (state) => state.error;
export const currentPageSelector = (state) => state.currentPage;
export const offsetSelector = (state) => state.offset;
export const loggedInSelector = (state) => state.isLoggedIn;
