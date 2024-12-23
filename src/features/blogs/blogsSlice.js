import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { URL } from '../../utils/constants';

export const createNewUser = createAsyncThunk(
  '@@create/createNewUser',
  async (data, { rejectWithValue }) => {
    try {
      const response = await fetch(`${URL}/users`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error(response.status);
    } catch (error) {
      return rejectWithValue(`Ошибка регистрации пользователя ${error}`);
    }
  }
);

export const loginUser = createAsyncThunk(
  '@@login/loginUser',
  async (data, { rejectWithValue }) => {
    try {
      const response = await fetch(`${URL}/users/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error(response.status);
      return await response.json();
    } catch (error) {
      return rejectWithValue(`Ошибка авторизовывания пользователя ${error}`);
    }
  }
);

export const loadBlogs = createAsyncThunk(
  '@@load/loadBlogs',
  async (offset = 0, { rejectWithValue, getState }) => {
    const state = getState();
    const token = state.currentUser?.token;
    const headers = token ? { Authorization: `Bearer ${token}` } : {};
    try {
      const response = await fetch(`${URL}/articles?limit=5&offset=${offset}`, {
        method: 'GET',
        headers,
      });
      if (!response.ok) throw new Error(response.status);
      return await response.json();
    } catch (error) {
      return rejectWithValue(`Ошибка в получении постов ${error}`);
    }
  }
);

export const editProfile = createAsyncThunk(
  '@@edit/editProfile',
  async (data, { rejectWithValue, getState }) => {
    const {
      currentUser: { token },
    } = getState();
    try {
      const response = await fetch(`${URL}/user`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error(response.status);
      return await response.json();
    } catch (error) {
      return rejectWithValue(`Ошибка редактирования профиля ${error}`);
    }
  }
);

export const getArticle = createAsyncThunk(
  '@@get/getArticle',
  async (slug, { rejectWithValue, getState }) => {
    const state = getState();
    const token = state.currentUser?.token;
    const headers = token ? { Authorization: `Bearer ${token}` } : {};

    try {
      const response = await fetch(`${URL}/articles/${slug}`, {
        method: 'GET',
        headers,
      });

      if (!response.ok) {
        throw new Response('Произошла ошибка в загрузке поста', {
          status: response.status,
          statusText: 'Not found',
        });
      }
      return response.json();
    } catch (error) {
      return rejectWithValue(`Ошибка редактирования профиля ${error}`);
    }
  }
);

export const createArticle = createAsyncThunk(
  '@@create/createArticle',
  async (data, { rejectWithValue, getState }) => {
    const {
      currentUser: { token },
    } = getState();
    try {
      const response = await fetch(`${URL}/articles`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error(response.status);

      return await response.json();
    } catch (error) {
      return rejectWithValue(`Ошибка создания поста ${error}`);
    }
  }
);

export const editArticle = createAsyncThunk(
  '@@edit/editArticle',
  async (data, { rejectWithValue, getState }) => {
    const { newArticle, slug } = data;
    const {
      currentUser: { token },
    } = getState();
    try {
      const response = await fetch(`${URL}/articles/${slug}`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newArticle),
      });
      if (!response.ok) throw new Error(response.status);
      return await response.json();
    } catch (error) {
      return rejectWithValue(`Ошибка редактирования поста ${error}`);
    }
  }
);

export const deleteArticle = createAsyncThunk(
  '@@delete/deleteArticle',
  async (slug, { rejectWithValue, getState }) => {
    const {
      currentUser: { token },
    } = getState();
    try {
      const response = await fetch(`${URL}/articles/${slug}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) throw new Error(response.status);
    } catch (error) {
      return rejectWithValue(`Ошибка удаления поста ${error}`);
    }
  }
);

export const favoriteArticle = createAsyncThunk(
  '@@favorite/favoriteArticle',
  async (slug, { rejectWithValue, getState }) => {
    const {
      currentUser: { token },
    } = getState();
    try {
      const response = await fetch(`${URL}/articles/${slug}/favorite`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) throw new Error(response.status);
      return response.json();
    } catch (error) {
      return rejectWithValue(`Ошибка добавления поста в избранное ${error}`);
    }
  }
);

export const unfavoriteArticle = createAsyncThunk(
  '@@unfavorite/unfavoriteArticle',
  async (slug, { rejectWithValue, getState }) => {
    const {
      currentUser: { token },
    } = getState();
    try {
      const response = await fetch(`${URL}/articles/${slug}/favorite`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.json();
    } catch (error) {
      return rejectWithValue(`Ошибка удаления поста из избранного ${error}`);
    }
  }
);

const initialState = {
  currentUser: null,
  articles: [],
  article: null,
  articlesCount: 0,
  isLoading: false,
  isLoggedIn: false,
  error: null,
  currentPage: 1,
  offset: 0,
};

const blogsSlice = createSlice({
  name: '@@blog',
  initialState: initialState,
  reducers: {
    // setLoading: (state, action) => {
    //   state.isLoading = action.payload;
    // },
    setPage: (state, action) => {
      state.currentPage = action.payload;
      state.offset = action.payload * 5 - 5;
    },
    setLogOut: (state) => {
      state.isLoggedIn = false;
      state.currentUser = null;
      state.articles = [];
      state.error = null;
      state.article = null;
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
      .addCase(createNewUser.fulfilled, (state) => {
        state.isLoading = false;
        // state.currentUser = action.payload;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.currentUser = action.payload.user;
        state.isLoggedIn = true;
      })
      .addCase(editProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.currentUser = action.payload.user;
      })
      .addCase(getArticle.fulfilled, (state, action) => {
        state.isLoading = false;
        state.article = action.payload.article;
      })
      .addCase(createArticle.fulfilled, (state, action) => {
        state.isLoading = false;
        state.articles.unshift(action.payload.article);
        state.articles.pop();
      })
      .addCase(editArticle.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(deleteArticle.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(favoriteArticle.fulfilled, (state, action) => {
        state.isLoading = false;
        state.articles = state.articles.map((article) => {
          return article.slug === action.payload.article.slug
            ? {
                ...article,
                favorited: action.payload.article.favorited,
                favoritesCount: action.payload.article.favoritesCount,
              }
            : article;
        });
        state.article = action.payload.article;
      })
      .addCase(unfavoriteArticle.fulfilled, (state, action) => {
        state.isLoading = false;
        state.articles = state.articles.map((article) => {
          return article.slug === action.payload.article.slug
            ? {
                ...article,
                favorited: action.payload.article.favorited,
                favoritesCount: action.payload.article.favoritesCount,
              }
            : article;
        });
        state.article = action.payload.article;
      })
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

export const { setLoading, setPage, setLogOut } = blogsSlice.actions;

export default blogsSlice.reducer;

export const articlesSelector = (state) => state.articles;
export const oneArticleSelector = (state) => state.article;
export const articlesCountSelector = (state) => state.articlesCount;
export const loadingSelector = (state) => state.isLoading;
export const errorSelector = (state) => state.error;
export const currentPageSelector = (state) => state.currentPage;
export const offsetSelector = (state) => state.offset;
export const loggedInSelector = (state) => state.isLoggedIn;
export const userSelector = (state) => state.currentUser;
