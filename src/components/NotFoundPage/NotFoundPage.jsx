import notFoundStyle from './NotFoundPage.module.scss';
import { Link } from 'react-router-dom';

export default function NotFoundPage() {
  return (
    <h1 className={notFoundStyle.title}>
      This page doesn't exist. Go <Link to='/'>home</Link>
    </h1>
  );
}
