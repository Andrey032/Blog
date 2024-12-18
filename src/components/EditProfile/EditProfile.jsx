import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';

import Form from '../Form';
import Input from '../Input';
import { username, email, password, url } from '../../utils/regex';
import { editPrifile } from '../../features/blogs/blogsSlice';

import style from './EditProfile.module.scss';
import { useNavigate } from 'react-router-dom';

const EditProfile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    handleSubmit,
    register,
    formState: { errors, isValid },
    reset,
  } = useForm({
    mode: 'onChange',
  });

  const onSubmit = (data) => {
    const editData = {
      user: {
        email: data.email,
        username: data.user,
        bio: 'I work at State Farm.',
        image: data.url,
      },
    };
    dispatch(editPrifile(editData));
    reset();
    navigate('/articles');
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)} title='Edit Profile' textBtn='Save' isValid={isValid}>
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
          text='New password'
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
          text='Avatar image (url)'
          name='url'
          type='url'
          pattern={url}
          required
          register={register}
          errors={errors}
          title='Введите коректный URL формата https://...com'
        />
      </div>
    </Form>
  );
};

export default EditProfile;
