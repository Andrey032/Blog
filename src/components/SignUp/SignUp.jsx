import signUpStyle from './SignUp.module.scss';

import Input from '../Input';
import Form from '../Form';

import { username, email, password } from '../../utils/regex';

export default function SignUp() {
  const handleSubmit = (evt) => {
    evt.preventDefault();
    console.log('SignUp');
  };

  return (
    <Form handleSubmit={handleSubmit} title='Create new account' textBtn='Create'>
      <div>
        <Input text='Username' pattern={username} required />
        <Input text='Email address' type='email' pattern={email} required />
        <Input text='Password' type='password' pattern={password} required />
        <Input text='Repeat Password' type='password' pattern={password} required />
      </div>

      <div className={signUpStyle.border}></div>
      <Input text={'I agree to the processing of my personal information'} type='checkbox' />
    </Form>
  );
}
