import { app } from './App.module.scss';
import { RouterProvider } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { loadBlogs, offsetSelector, setUser, tokenSelector } from '../../features/blogs/blogsSlice';
import { URL } from '../../constants/constants';
import { router } from '../../routes/routes';

const App = () => {
  const dispatch = useDispatch();
  const offset = useSelector(offsetSelector);
  const token = useSelector(tokenSelector);

  useEffect(() => {
    if (token) {
      fetch(`${URL}/user`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => response.json())
        .then(({ user }) => dispatch(setUser(user)));
    }
    dispatch(loadBlogs(offset));
  }, [dispatch, offset, token]);

  return (
    <div className={app}>
      <RouterProvider router={router} future={{ v7_startTransition: true }} />
    </div>
  );
};

export default App;
