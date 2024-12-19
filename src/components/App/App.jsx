import { app } from './App.module.scss';
import {
  Route,
  Navigate,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import CardsList from '../CardsList';
import NotFoundPage from '../NotFoundPage/NotFoundPage';
import Layout from '../Layout';
import { Article, articleLoader } from '../Article';
import SignUp from '../SignUp';
import SignIn from '../SignIn';
import EditProfile from '../EditProfile';
import CreateArticle from '../CreateArticle';
import EditArticle from '../EditArticle';
import PrivateRoute from '../PrivateRoute';

import { loadBlogs, offsetSelector } from '../../features/blogs/blogsSlice';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<Layout />}>
      <Route index element={<CardsList />} />
      <Route path='articles' element={<Navigate to='/' replace />} />
      <Route path='articles/:slug' element={<Article />} loader={articleLoader} />

      <Route
        path='articles/:slug/edit'
        element={
          <PrivateRoute>
            <EditArticle />
          </PrivateRoute>
        }
        loader={articleLoader}
      />
      <Route
        path='new-article'
        element={
          <PrivateRoute>
            <CreateArticle />
          </PrivateRoute>
        }
      />
      <Route
        path='profile'
        element={
          <PrivateRoute>
            <EditProfile />
          </PrivateRoute>
        }
      />

      <Route path='sign-up' element={<SignUp />} />
      <Route path='sign-in' element={<SignIn />} />

      <Route path='*' element={<NotFoundPage />} />
    </Route>
  ),
  {
    future: {
      v7_relativeSplatPath: true,
      v7_fetcherPersist: true,
      v7_normalizeFormMethod: true,
      v7_partialHydration: true,
      v7_skipActionErrorRevalidation: true,
    },
  }
);

const App = () => {
  const dispatch = useDispatch();
  const offset = useSelector(offsetSelector);

  useEffect(() => {
    dispatch(loadBlogs(offset));
  }, [dispatch, offset]);

  return (
    <div className={app}>
      <RouterProvider router={router} future={{ v7_startTransition: true }} />
    </div>
  );
};

export default App;
