import Like from '../Like/Like';
import cardStyle from './Card.module.scss';
import { format } from 'date-fns';

export default function Card({
  title,
  favoritesCount,
  tagList,
  description,
  createdAt,
  author: { username, image },
}) {
  return (
    <article className={cardStyle.card}>
      <div className={cardStyle.card__info}>
        <div className={cardStyle.card__containerTitle}>
          <h2 className={cardStyle.card__title}>{title}</h2>
          <Like like={favoritesCount} />
        </div>
        {tagList.map((tag, i) => (
          <span key={`${tag}${i}`} className={cardStyle.card__tag}>
            {tag}
          </span>
        ))}
        <p className={cardStyle.card__text}>{description}</p>
      </div>
      <div className={cardStyle.card__userContainer}>
        <div className={cardStyle.card__user}>
          <h2 className={cardStyle.card__name}>{username}</h2>
          <span className={cardStyle.card__date}>
            {format(new Date(createdAt), 'MMMM d, yyyy')}
          </span>
        </div>
        <img className={cardStyle.card__avatar} src={image} alt='аватар профиля' />
      </div>
    </article>
  );
}
