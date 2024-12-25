import { Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

import Header from '../Header';
import Spiner from '../Spiner';
import { loadingSelector } from '../../features/blogs/blogsSlice';

const Layout = () => {
  const isLoading = useSelector(loadingSelector);

  return (
    <>
      <Header />
      {isLoading && <Spiner />}
      {!isLoading && <Outlet />}
    </>
  );
};

export default Layout;
