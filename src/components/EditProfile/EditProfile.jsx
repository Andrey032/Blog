import { useForm, FormProvider } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import Form from '../Form';
import Input from '../Input';
import { username, email, password, url } from '../../utils/regex';
import { editProfile } from '../../features/blogs/blogsSlice';

import style from './EditProfile.module.scss';

const EditProfile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const methods = useForm({
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
    dispatch(editProfile(editData));
    methods.reset();
    navigate('/articles');
  };

  return (
    <FormProvider {...methods}>
      <Form
        onSubmit={methods.handleSubmit(onSubmit)}
        title='Edit Profile'
        textBtn='Save'
        isValid={methods.formState.isValid}
      >
        <div className={style.container}>
          <Input
            text='Username'
            name='user'
            pattern={username}
            required
            minLength={3}
            maxLength={20}
            title='Не меньше 3х первых букв'
          />
          <Input
            text='Email address'
            name='email'
            type='email'
            pattern={email}
            required
            title='Латинскими буквами в формате mail@mail.com'
          />
          <Input
            text='New password'
            name='password'
            type='password'
            pattern={password}
            required
            minLength={6}
            maxLength={40}
            title='Не меньше 3х латинских букв и 3х цифр'
          />
          <Input
            text='Avatar image (url)'
            name='url'
            type='url'
            pattern={url}
            required
            title='Введите коректный URL формата https://...com'
          />
        </div>
      </Form>
    </FormProvider>
  );
};

export default EditProfile;
