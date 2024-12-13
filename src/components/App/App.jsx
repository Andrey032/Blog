import { app } from './App.module.scss';
import { Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import CardsList from '../CardsList';
import NotFoundPage from '../NotFoundPage/NotFoundPage';
import Layout from '../Layout';
import SinglePage from '../SinglePage';
import SignUp from '../SignUp';

import { loadBlogs, offsetSelector } from '../../features/blogs/blogsSlice';

function App() {
  const dispatch = useDispatch();
  const offset = useSelector(offsetSelector);

  useEffect(() => {
    dispatch(loadBlogs(offset));
  }, [dispatch, offset]);

  return (
    <div className={app}>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<CardsList />} />
          <Route path='articles' element={<CardsList />} />
          <Route path='articles/:slug' element={<SinglePage />} />
          <Route path='sign-up' element={<SignUp />} />

          <Route path='*' element={<NotFoundPage />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
