import { Link } from 'react-router-dom';

import style from './Form.module.scss';
import ButtonSubmit from '../ButtonSubmit/ButtonSubmit';

const Form = ({ onSubmit, title, children, textBtn, isValid }) => {
  const text = textBtn === 'Create' ? 'Already have an account? ' : 'Don’t have an account? ';

  return (
    <form onSubmit={onSubmit} className={style.form}>
      <div className={style.form__container}>
        <h2 className={style.form__title}>{title}</h2>
        {children}
        <ButtonSubmit textBtn={textBtn} isValid={isValid} />
        {(textBtn === 'Create' || textBtn === 'Login') && (
          <p className={style.form__text}>
            {text}
            {textBtn === 'Create' && (
              <Link to={'/sign-in'} className={style.form__link}>
                Sign In.
              </Link>
            )}
            {textBtn === 'Login' && (
              <Link to={'/sign-up'} className={style.form__link}>
                Sign Up.
              </Link>
            )}
          </p>
        )}
      </div>
    </form>
  );
};

export default Form;
