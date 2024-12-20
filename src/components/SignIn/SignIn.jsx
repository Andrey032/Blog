import { useForm, FormProvider } from 'react-hook-form';
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
    methods.reset();
    navigate(fromPage, { replace: true });
  };

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
            pattern={email}
            required
            title='Латинскими буквами в формате mail@mail.com'
          />
          <Input
            text='Password'
            name='password'
            type='password'
            pattern={password}
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
