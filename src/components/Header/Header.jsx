import headerStyle from './Header.module.scss';
import Button from '../Button';
import { useSelector } from 'react-redux';
import { loggedInSelector } from '../../features/blogs/blogsSlice';

export default function Header() {
  const isLoggedIn = useSelector(loggedInSelector);
  return (
    <header className={headerStyle.header}>
      <h2 className={headerStyle.header__title}>Realworld Blog</h2>
      {!isLoggedIn && (
        <div className={headerStyle.header__containerLogin}>
          <Button text='Sign In' />
          <Button text='Sign Up' color='green' size='big' />
        </div>
      )}
      {isLoggedIn && (
        <div className={headerStyle.header__containerLogout}>
          <Button text='Create article' color='green' size='small' />
          <div className={headerStyle.header__user}>
            <h3 className={headerStyle.header__userName}>John Doe</h3>
            <img src='/avatar.svg' alt='аватар' />
          </div>
          <Button text='Log Out' color='grey' size='big' />
        </div>
      )}
    </header>
  );
}
