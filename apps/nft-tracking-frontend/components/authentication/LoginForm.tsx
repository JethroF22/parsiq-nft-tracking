import { useForm } from 'react-hook-form';

import Button from './styled/Button';

interface LoginFormState {
  email: string;
  password: string;
}

export default function LoginForm() {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

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
            {...register('email', { required: true })}
          />
          {errors.email && <span>This field is required</span>}
        </div>
        <div className="input-group">
          <input
            type="password"
            placeholder="Password"
            name="password"
            {...register('password', { required: true })}
          />
          {errors.password && <span>This field is required</span>}
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
