import likeStyle from './Like.module.scss';

export default function Like({ like }) {
  return (
    <label className={likeStyle.checkbox}>
      <input className={likeStyle.checkbox__input} type='checkbox' />
      <span className={likeStyle.checkbox__label}>{like}</span>
    </label>
  );
}
