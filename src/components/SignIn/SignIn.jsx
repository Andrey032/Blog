import { useForm } from 'react-hook-form';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import Form from '../Form';
import Input from '../Input';
import { email, password } from '../../utils/regex';
import { loginUser } from '../../features/blogs/blogsSlice';

import style from './SignIn.module.scss';

const SignIn = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  const fromPage = location.state?.from?.pathname || '/';

  const {
    handleSubmit,
    register,
    formState: { errors, isValid },
    reset,
  } = useForm({
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
    navigate(fromPage, { replace: true });
    reset();
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)} title='Sign In' textBtn='Login' isValid={isValid}>
      <div className={style.container}>
        <Input
          text='Email address'
          name='email'
          type='email'
          pattern={email}
          required
          register={register}
          errors={errors}
          title='Латинскими буквами в формате mail@mail.com'
        />
        <Input
          text='Password'
          name='password'
          type='password'
          pattern={password}
          required
          register={register}
          minLength={6}
          maxLength={40}
          errors={errors}
          title='Не меньше 3х латинских букв и 3х цифр'
        />
      </div>
    </Form>
  );
};

export default SignIn;
