import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';

import Input from '../Input';
import Form from '../Form';
import { username, email, password } from '../../utils/regex';
import { createNewUser } from '../../features/blogs/blogsSlice';

import style from './SignUp.module.scss';

const SignUp = () => {
  const dispatch = useDispatch();

  const {
    handleSubmit,
    register,
    formState: { errors, isValid },
    reset,
  } = useForm({
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
    reset();
  };

  return (
    <Form
      onSubmit={handleSubmit(onSubmit)}
      title='Create new account'
      textBtn='Create'
      isValid={isValid}
    >
      <div className={style.container}>
        <Input
          text='Username'
          name='user'
          pattern={username}
          required
          register={register}
          minLength={3}
          maxLength={20}
          errors={errors}
          title='Не меньше 3х первых букв'
        />
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
        <Input
          text='Repeat Password'
          name='repeat'
          type='password'
          pattern={password}
          required
          register={register}
          minLength={6}
          maxLength={40}
          errors={errors}
          title='Введите повторно пароль'
        />
      </div>

      <div className={style.border}></div>
      <Input
        text='I agree to the processing of my personal information'
        name='checkbox'
        type='checkbox'
        required='Отметьте если согласны'
        register={register}
        errors={errors}
      />
    </Form>
  );
};

export default SignUp;
