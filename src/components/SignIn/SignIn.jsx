import Form from '../Form';
import Input from '../Input';

import { email, password } from '../../utils/regex';

export default function SignIn() {
  const handleSubmit = (evt) => {
    evt.preventDefault();
    console.log('SignIn');
  };

  return (
    <Form handleSubmit={handleSubmit} title='Sign In' textBtn='Login'>
      <div>
        <Input text='Email address' type='email' pattern={email} required />
        <Input text='Password' type='password' pattern={password} required />
      </div>
    </Form>
  );
}
