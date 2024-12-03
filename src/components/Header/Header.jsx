import headerStyle from './Header.module.scss';
import Button from '../Button';

export default function Header() {
  return (
    <header className={headerStyle.header}>
      <h2 className={headerStyle.header__title}>Realworld Blog</h2>
      <div className={headerStyle.header__containerBtn}>
        <Button text='Sign In' />
        <Button text='Sign Up' color='green' />
      </div>
    </header>
  );
}
