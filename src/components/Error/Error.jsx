import { useSelector } from 'react-redux';

import { errorSelector } from '../../features/blogs/blogsSlice';

import style from './Error.module.scss';

const Error = () => {
  const error = useSelector(errorSelector);
  return <h2 className={style.error}>{error}</h2>;
};

export default Error;
