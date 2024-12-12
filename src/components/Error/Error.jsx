import errorStyle from './Error.module.scss';
import { errorSelector } from '../../features/blogs/blogsSlice';
import { useSelector } from 'react-redux';

export default function Error() {
  const error = useSelector(errorSelector);
  return <h2 className={errorStyle.error}>{error}</h2>;
}
