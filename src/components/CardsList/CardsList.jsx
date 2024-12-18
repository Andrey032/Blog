import { useSelector } from 'react-redux';
import { articlesSelector } from '../../features/blogs/blogsSlice';

import Card from '../Card/Card';
import Pagination from '../Pagination';

import style from './CardsList.module.scss';

const CardsList = () => {
  const articles = useSelector(articlesSelector);
  return (
    <>
      <ul className={style.cardsList}>
        {articles.map((article) => {
          return <Card key={article.slug} {...article} />;
        })}
      </ul>
      <Pagination />
    </>
  );
};

export default CardsList;
