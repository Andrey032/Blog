import { useForm, FormProvider } from 'react-hook-form';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';

import Form from '../Form';
import Input from '../Input';
import { emailRegex, passwordRegex } from '../../utils/regex';
import { errorSelector, loggedInSelector, loginUser } from '../../features/blogs/blogsSlice';

import style from './SignIn.module.scss';

const SignIn = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const errorInput = useSelector(errorSelector);
  const isLoggedIn = useSelector(loggedInSelector);

  const fromPage = location.state?.from?.pathname || '/';

  const methods = useForm({
    mode: 'onChange',
  });

  const onSubmit = (data) => {
    const userData = {
      user: {
        email: data.email,
        password: data.password,
      },
    };
    dispatch(loginUser(userData));
  };

  useEffect(() => {
    if (errorInput && !isLoggedIn) {
      methods.setError('email', {
        type: 'validate',
        message: 'электронная почта или пароль: недействителен',
      });
      methods.setError('password', {
        type: 'validate',
        message: 'электронная почта или пароль: недействителен',
      });
    } else if (errorInput === null && isLoggedIn) {
      navigate(fromPage, { replace: true });
    }
  }, [methods.setError, errorInput, navigate, fromPage, isLoggedIn]);

  return (
    <FormProvider {...methods}>
      <Form
        onSubmit={methods.handleSubmit(onSubmit)}
        title='Sign In'
        textBtn='Login'
        isValid={methods.formState.isValid}
      >
        <div className={style.container}>
          <Input
            text='Email address'
            name='email'
            type='email'
            pattern={emailRegex}
            required
            title='Латинскими буквами в формате mail@mail.com'
          />
          <Input
            text='Password'
            name='password'
            type='password'
            pattern={passwordRegex}
            required
            minLength={6}
            maxLength={40}
            title='Не меньше 3х латинских букв и 3х цифр'
          />
        </div>
      </Form>
    </FormProvider>
  );
};

export default SignIn;
