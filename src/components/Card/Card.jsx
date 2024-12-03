import cardStyle from './Card.module.scss';
console.log(cardStyle);

export default function Card() {
  return (
    <article className={cardStyle.card}>
      <div className={cardStyle.card__info}>
        <div className={cardStyle.card__containerTitle}>
          <h2 className={cardStyle.card__title}>Some article title</h2>
          <label>
            <input type='checkbox' />
            12
          </label>
          {/* <span className={cardStyle.card__like}>12</span> */}
        </div>
        <span className={cardStyle.card__tag}>Tag1</span>
        <p className={cardStyle.card__text}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
          ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation
          ullamco laboris nisi ut aliquip ex ea commodo consequat. ex ea commodo consequat.
        </p>
      </div>
      <div className={cardStyle.card__userContainer}>
        <div className={cardStyle.card__user}>
          <h2 className={cardStyle.card__name}>John Doe</h2>
          <span className='card__date'>March 5, 2020 </span>
        </div>
        <img className='cart__avatar' src='avatar.svg' alt='аватар профиля' />
      </div>
    </article>
  );
}
