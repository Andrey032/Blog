import { useSelector } from 'react-redux';
import Card from '../Card/Card';
import CardListStyle from './CardsList.module.scss';
import { articlesSelector } from '../../features/blogs/blogsSlice';

export default function CardsList() {
  const articles = useSelector(articlesSelector);
  return (
    <ul className={CardListStyle.cardsList}>
      {articles.map((article) => {
        return <Card key={article.slug} {...article} />;
      })}
    </ul>
  );
}
