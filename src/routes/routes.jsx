import { Route, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import {
  rootPath,
  articlesPath,
  articlesSlugPath,
  articlesSlugEditPath,
  newArticlePath,
  profilePath,
  signUpPath,
  signInPath,
  notFoundPath,
} from '../constants/constants';

import CardsList from '../components/CardsList';
import NotFoundPage from '../components/NotFoundPage';
import Layout from '../components/Layout';
import Article from '../components/Article';
import SignUp from '../components/SignUp';
import SignIn from '../components/SignIn';
import EditProfile from '../components/EditProfile';
import CreateArticle from '../components/CreateArticle';
import EditArticle from '../components/EditArticle';
import PrivateRoute from '../components/PrivateRoute';
import Error from '../components/Error';

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path={rootPath} element={<Layout />}>
      <Route index element={<CardsList />} />
      <Route path={articlesPath} element={<CardsList />} />
      <Route path={articlesSlugPath} element={<Article />} errorElement={<Error />} />

      <Route
        path={articlesSlugEditPath}
        element={
          <PrivateRoute>
            <EditArticle />
          </PrivateRoute>
        }
      />
      <Route
        path={newArticlePath}
        element={
          <PrivateRoute>
            <CreateArticle />
          </PrivateRoute>
        }
      />
      <Route
        path={profilePath}
        element={
          <PrivateRoute>
            <EditProfile />
          </PrivateRoute>
        }
      />

      <Route path={signUpPath} element={<SignUp />} />
      <Route path={signInPath} element={<SignIn />} />

      <Route path={notFoundPath} element={<NotFoundPage />} />
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
