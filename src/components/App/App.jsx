import { app } from './App.module.scss';

import Header from '../Header';
import CardsList from '../CardsList';

import { useEffect } from 'react';

import { loadBlogs } from '../../features/blogs/blogsSlice';
import { useDispatch } from 'react-redux';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadBlogs());
  }, [dispatch]);

  return (
    <div className={app}>
      <Header />
      <CardsList />
    </div>
  );
}

export default App;
