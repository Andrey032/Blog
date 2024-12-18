import { Navigate, useLocation } from 'react-router-dom';
import { loggedInSelector } from '../../features/blogs/blogsSlice';
import { useSelector } from 'react-redux';

const PrivateRoute = ({ children }) => {
  const location = useLocation();
  const isLoggedIn = useSelector(loggedInSelector);

  if (!isLoggedIn) return <Navigate to='/sign-in' state={{ from: location }} />;

  return children;
};

export default PrivateRoute;
