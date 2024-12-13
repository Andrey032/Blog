import signUpStyle from './SignUp.module.scss';
import Input from '../Input';
import { Link } from 'react-router-dom';

export default function SignUp() {
  const handleSubmit = (evt) => {
    evt.preventDefault();
    console.log('sdfsdfsdf');
  };

  return (
    <div className={signUpStyle.signUp}>
      <div className={signUpStyle.signUp__container}>
        <h2 className={signUpStyle.signUp__title}>Create new account</h2>
        <form onSubmit={handleSubmit} className={signUpStyle.signUp__form}>
          <Input text='Username' />
          <Input text='Email address' type='email' />
          <Input text='Password' type='password' />
          <Input text='Repeat Password' type='password' />
          <div className={signUpStyle.signUp__border}></div>
          <Input text={'I agree to the processing of my personal information'} type='checkbox' />
          <button type='submit' className={signUpStyle.signUp__btn}>
            Create
          </button>
        </form>
        <p className={signUpStyle.signUp__text}>
          Already have an account?{' '}
          <Link to={'/sign-in'} className={signUpStyle.signUp__link}>
            Sign In.
          </Link>
        </p>
      </div>
    </div>
  );
}
