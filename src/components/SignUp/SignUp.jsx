import signUpStyle from './SignUp.module.scss';
import { useForm } from 'react-hook-form';

import Input from '../Input';
import Form from '../Form';

import { username, email, password } from '../../utils/regex';

export default function SignUp() {
  const {
    handleSubmit,
    register,
    formState: { errors, isValid },
    reset,
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    reset();
  };

  return (
    <Form
      onSubmit={handleSubmit(onSubmit)}
      title='Create new account'
      textBtn='Create'
      isValid={isValid}
    >
      <div className={signUpStyle.container}>
        <Input
          text='Username'
          name='user'
          pattern={username}
          required='Введите ваше имя'
          register={register}
          errors={errors}
          minLength={3}
          maxLength={20}
        />
        <Input
          text='Email address'
          name='email'
          type='email'
          pattern={email}
          required='Введите вашу электронную почту '
          register={register}
          errors={errors}
        />
        <Input
          text='Password'
          name='password'
          type='password'
          pattern={password}
          required='Введите пароль'
          register={register}
          errors={errors}
        />
        <Input
          text='Repeat Password'
          name='repeat'
          type='password'
          pattern={password}
          required='Введите повторно пароль'
          register={register}
          errors={errors}
        />
      </div>

      <div className={signUpStyle.border}></div>
      <Input
        text={'I agree to the processing of my personal information'}
        name='checkbox'
        type='checkbox'
        required='Отметьте галочку'
        register={register}
        errors={errors}
      />
    </Form>
  );
}
