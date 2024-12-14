import { useSelector } from 'react-redux';
import likeStyle from './Like.module.scss';
import { loggedInSelector } from '../../features/blogs/blogsSlice';

export default function Like({ like }) {
  const isLoggedIn = useSelector(loggedInSelector);
  return (
    <label className={likeStyle.checkbox}>
      <input className={likeStyle.checkbox__input} type='checkbox' disabled={!isLoggedIn} />
      <span className={likeStyle.checkbox__label}>{like}</span>
    </label>
  );
}
