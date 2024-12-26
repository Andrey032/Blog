import { useForm, FormProvider } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

import Input from '../Input';
import Form from '../Form';
import { usernameRegex, emailRegex, passwordRegex } from '../../constants/regex';
import {
  createNewUser,
  errorSelector,
  successfulRegistrationSelector,
  setSuccessfulRegistration,
} from '../../features/blogs/blogsSlice';

import style from './SignUp.module.scss';

const SignUp = () => {
  const dispatch = useDispatch();
  const errorInput = useSelector(errorSelector);
  const successfulRegistration = useSelector(successfulRegistrationSelector);
  const navigate = useNavigate();
  const methods = useForm({
    mode: 'onChange',
  });

  const onSubmit = (data) => {
    const newUser = {
      user: {
        username: data.user,
        email: data.email,
        password: data.password,
      },
    };
    dispatch(createNewUser(newUser));
  };

  useEffect(() => {
    if (errorInput?.username) {
      methods.setError('user', {
        type: 'validate',
        message: 'Имя занято другим пользователем',
      });
    }
    if (errorInput?.email) {
      methods.setError('email', {
        type: 'validate',
        message: 'Электронная почта зарегистрирована в сети',
      });
    } else if (errorInput === null && successfulRegistration) {
      navigate('/sign-in', { replace: true });
      dispatch(setSuccessfulRegistration(false));
    }
  }, [methods.setError, errorInput, successfulRegistration]);

  return (
    <FormProvider {...methods}>
      <Form
        onSubmit={methods.handleSubmit(onSubmit)}
        title='Create new account'
        textBtn='Create'
        isValid={methods.formState.isValid}
      >
        <div className={style.container}>
          <Input
            text='Username'
            name='user'
            pattern={usernameRegex}
            required
            minLength={3}
            maxLength={20}
            title='Не меньше 3х первых букв'
          />
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
          <Input
            text='Repeat Password'
            name='confirmPassword'
            type='password'
            pattern={passwordRegex}
            required
            minLength={6}
            maxLength={40}
            title='Введите повторно пароль'
          />
        </div>

        <div className={style.border}></div>
        <Input
          text='I agree to the processing of my personal information'
          name='checkbox'
          type='checkbox'
          required='Отметьте если согласны'
        />
      </Form>
    </FormProvider>
  );
};

export default SignUp;
