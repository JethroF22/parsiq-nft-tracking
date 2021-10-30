import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import Button from './styled/Button';
import { loginFormValidationSchema } from '../../lib';

interface LoginFormState {
  email: string;
  password: string;
}

export default function LoginForm() {
  const formOptions = { resolver: yupResolver(loginFormValidationSchema) };
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm(formOptions);

  const logIn = (formState: LoginFormState) => {
    console.log('formState', formState);
  };

  return (
    <>
      <div className="body">
        <div className="input-group">
          <input
            type="text"
            placeholder="Email"
            name="email"
            {...register('email')}
            className={errors.email ? 'input-error' : ''}
          />
        </div>
        <div className="input-group">
          <input
            type="password"
            placeholder="Password"
            name="password"
            {...register('password')}
            className={errors.password ? 'input-error' : ''}
          />
        </div>
        <div className="input-group">
          <Button onClick={handleSubmit(logIn)} className="button">
            Log In
          </Button>
        </div>
        <div className="input-group input-group-row">
          Don&apos;t have an account?{' '}
          <span className="link">Sign up here.</span>
        </div>
      </div>
    </>
  );
}
