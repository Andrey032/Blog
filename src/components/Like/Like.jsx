import { useDispatch, useSelector } from 'react-redux';

import { favoriteArticle, tokenSelector, unfavoriteArticle } from '../../features/blogs/blogsSlice';

import style from './Like.module.scss';
import classNames from 'classnames';

const Like = ({ count, isFavorited, slug }) => {
  const dispatch = useDispatch();
  const token = useSelector(tokenSelector);

  const favoritedStyle = classNames(
    isFavorited ? style.checkbox__favorited : style.checkbox__input
  );

  const handlefavorited = () => {
    if (isFavorited) {
      dispatch(unfavoriteArticle(slug));
    } else {
      dispatch(favoriteArticle(slug));
    }
  };

  return (
    <label className={style.checkbox}>
      <input
        className={favoritedStyle}
        type='checkbox'
        disabled={!token}
        onClick={handlefavorited}
      />
      <span className={style.checkbox__label}>{count}</span>
    </label>
  );
};

export default Like;
