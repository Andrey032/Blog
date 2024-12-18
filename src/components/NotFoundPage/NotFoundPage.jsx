import { Link } from 'react-router-dom';

import style from './NotFoundPage.module.scss';

const NotFoundPage = () => {
  return (
    <h1 className={style.title}>
      This page doesn't exist. Go <Link to='/'>home</Link>
    </h1>
  );
};

export default NotFoundPage;
