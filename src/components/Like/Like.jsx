import { useDispatch, useSelector } from 'react-redux';

import { favoriteArticle, loggedInSelector } from '../../features/blogs/blogsSlice';

import style from './Like.module.scss';
import classNames from 'classnames';

const Like = ({ like, isFavorited, slug }) => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(loggedInSelector);

  const favoritedStyle = classNames(
    isFavorited ? style.checkbox__favorited : style.checkbox__input
  );

  const handlefavorited = () => {
    dispatch(favoriteArticle(slug));
  };

  return (
    <label className={style.checkbox} onClick={handlefavorited}>
      <input className={favoritedStyle} type='checkbox' disabled={!isLoggedIn} />
      <span className={style.checkbox__label}>{like}</span>
    </label>
  );
};

export default Like;
