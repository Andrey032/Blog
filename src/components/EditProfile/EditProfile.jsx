import editProfileStyle from './EditProfile.module.scss';

import Form from '../Form';
import Input from '../Input';

import { username, email, password, url } from '../../utils/regex';

export default function EditProfile() {
  const handleSubmit = (evt) => {
    evt.preventDefault();
    console.log('SignIn');
  };

  return (
    <Form handleSubmit={handleSubmit} title='Edit Profile' textBtn='Save'>
      <div>
        <Input text='Username' pattern={username} required />
        <Input text='Email address' type='email' pattern={email} required />
        <Input text='New password' type='password' pattern={password} required />
        <Input text='Avatar image (url)' type='url' pattern={url} required />
      </div>
    </Form>
  );
}
