import signInStyle from './SignIn.module.scss';

import Form from '../Form';
import Input from '../Input';

import { useForm } from 'react-hook-form';

import { email, password } from '../../utils/regex';

export default function SignIn() {
  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    reset();
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)} title='Sign In' textBtn='Login'>
      <div className={signInStyle.container}>
        <Input
          text='Email address'
          name='email'
          type='email'
          pattern={email}
          required
          register={register}
          errors={errors}
        />
        <Input
          text='Password'
          name='password'
          type='password'
          pattern={password}
          required
          register={register}
          errors={errors}
        />
      </div>
    </Form>
  );
}
