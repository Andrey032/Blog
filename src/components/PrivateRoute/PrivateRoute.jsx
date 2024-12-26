import { Navigate, useLocation } from 'react-router-dom';
import { tokenSelector } from '../../features/blogs/blogsSlice';
import { useSelector } from 'react-redux';

const PrivateRoute = ({ children }) => {
  const location = useLocation();
  const token = useSelector(tokenSelector);

  if (!token) return <Navigate to='/sign-in' state={{ from: location }} />;

  return children;
};

export default PrivateRoute;
