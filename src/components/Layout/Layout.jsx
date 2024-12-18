import { Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

import Header from '../Header';
import Error from '../Error';
import Spiner from '../Spiner';
import { loadingSelector, errorSelector } from '../../features/blogs/blogsSlice';

const Layout = () => {
  const isLoading = useSelector(loadingSelector);
  const error = useSelector(errorSelector);

  return (
    <>
      <Header />
      {error && <Error />}
      {isLoading && <Spiner />}
      {!isLoading && !error && <Outlet />}
    </>
  );
};

export default Layout;
