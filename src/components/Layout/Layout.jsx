import Header from '../Header';
import Error from '../Error';
import { Outlet } from 'react-router-dom';
import Spiner from '../Spiner';
import { loadingSelector, errorSelector } from '../../features/blogs/blogsSlice';
import { useSelector } from 'react-redux';

export default function Layout() {
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
}
