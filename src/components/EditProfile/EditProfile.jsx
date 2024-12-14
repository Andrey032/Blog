import editProfileStyle from './EditProfile.module.scss';

import Form from '../Form';
import Input from '../Input';

import { useForm } from 'react-hook-form';

import { username, email, password, url } from '../../utils/regex';

export default function EditProfile() {
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
    <Form onSubmit={handleSubmit(onSubmit)} title='Edit Profile' textBtn='Save'>
      <div className={editProfileStyle.container}>
        <Input
          text='Username'
          name='user'
          pattern={username}
          required
          register={register}
          errors={errors}
        />
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
          text='New password'
          name='password'
          type='password'
          pattern={password}
          required
          register={register}
          errors={errors}
        />
        <Input
          text='Avatar image (url)'
          name='url'
          type='url'
          pattern={url}
          required
          register={register}
          errors={errors}
        />
      </div>
    </Form>
  );
}
