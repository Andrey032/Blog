import { useSelector } from 'react-redux';

import { errorSelector } from '../../features/blogs/blogsSlice';

import style from './Error.module.scss';
import { useRouteError } from 'react-router-dom';

const Error = () => {
  const error = useSelector(errorSelector);
  const routeError = useRouteError();

  return (
    <>
      {error && <h2 className={style.error}>{error}</h2>}
      {routeError && (
        <>
          <h2 className={style.error}>{routeError.data}</h2>
          <h3 className={style.error}>{`${routeError.statusText} ${routeError.status}`}</h3>
        </>
      )}
    </>
  );
};

export default Error;
