import { useSelector } from 'react-redux';

import { loggedInSelector } from '../../features/blogs/blogsSlice';

import style from './Like.module.scss';

const Like = ({ like }) => {
  const isLoggedIn = useSelector(loggedInSelector);
  return (
    <label className={style.checkbox}>
      <input className={style.checkbox__input} type='checkbox' disabled={!isLoggedIn} />
      <span className={style.checkbox__label}>{like}</span>
    </label>
  );
};

export default Like;
