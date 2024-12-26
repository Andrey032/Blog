import { Suspense } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

import Button from '../Button';
import ImageComponent from '../ImageComponent/ImageComponent';

import { setLogOut, tokenSelector, userSelector } from '../../features/blogs/blogsSlice';

import style from './Header.module.scss';

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = useSelector(tokenSelector);
  const user = useSelector(userSelector);

  const handleLogOut = () => {
    dispatch(setLogOut());
    navigate('sign-in');
  };

  const goSignIn = () => {
    navigate('sign-in');
  };

  const goSignUp = () => {
    navigate('sign-up');
  };

  const goCreateArticle = () => {
    navigate('new-article');
  };

  return (
    <header className={style.header}>
      <h2 className={style.header__title}>Realworld Blog</h2>
      {!token && (
        <div className={style.header__containerLogin}>
          <Button text='Sign In' onClick={goSignIn} />
          <Button text='Sign Up' onClick={goSignUp} color='green' size='big' />
        </div>
      )}
      {token && (
        <div className={style.header__containerLogout}>
          <Button text='Create article' color='green' size='small' onClick={goCreateArticle} />
          <Link to='profile' className={style.header__user}>
            <h3 className={style.header__userName}>{user?.username}</h3>
            <Suspense>
              <ImageComponent image={user?.image} />
            </Suspense>
          </Link>
          <Button text='Log Out' color='grey' size='big' onClick={handleLogOut} />
        </div>
      )}
    </header>
  );
};

export default Header;
