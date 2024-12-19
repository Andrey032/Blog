import { Link } from 'react-router-dom';
import { format } from 'date-fns';

import Like from '../Like/Like';

import style from './Card.module.scss';

const Card = ({
  slug,
  title,
  favoritesCount,
  favorited,
  tagList,
  description,
  createdAt,
  author: { username, image },
}) => {
  return (
    <li className={style.card}>
      <div className={style.card__info}>
        <div className={style.card__containerTitle}>
          <Link to={`/articles/${slug}`} className={style.card__title}>
            {title}
          </Link>
          <Like like={favoritesCount} isFavorited={favorited} slug={slug} />
        </div>
        {tagList?.map((tag, i) => (
          <span key={`${tag}${i}`} className={style.card__tag}>
            {tag}
          </span>
        ))}
        <p className={style.card__text}>{description}</p>
      </div>
      <div className={style.card__userContainer}>
        <div className={style.card__user}>
          <h2 className={style.card__name}>{username}</h2>
          <span className={style.card__date}>{format(new Date(createdAt), 'MMMM d, yyyy')}</span>
        </div>
        <img className={style.card__avatar} src={image} alt='аватар' />
      </div>
    </li>
  );
};

export default Card;
