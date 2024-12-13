import formStyle from './Form.module.scss';
import { Link } from 'react-router-dom';

export default function Form({ handleSubmit, title, children, textBtn }) {
  const text = textBtn === 'Create' ? 'Already have an account? ' : 'Don’t have an account? ';
  return (
    <form onSubmit={handleSubmit} className={formStyle.form}>
      <div className={formStyle.form__container}>
        <h2 className={formStyle.form__title}>{title}</h2>
        {children}
        <button type='submit' className={formStyle.form__btn}>
          {textBtn}
        </button>
        {(textBtn === 'Create' || textBtn === 'Login') && (
          <p className={formStyle.form__text}>
            {text}
            {textBtn === 'Create' && (
              <Link to={'/sign-in'} className={formStyle.form__link}>
                Sign In.
              </Link>
            )}
            {textBtn === 'Login' && (
              <Link to={'/sign-up'} className={formStyle.form__link}>
                Sign Up.
              </Link>
            )}
          </p>
        )}
      </div>
    </form>
  );
}
