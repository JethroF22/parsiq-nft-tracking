import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import Button from './styled/Button';
import { signUpFormValidationSchema } from '../../lib';

interface SignUpFormState {
  email: string;
  password: string;
  confirmPassword: string;
}

export default function SignUpForm() {
  const formOptions = {
    resolver: yupResolver(signUpFormValidationSchema),
  };
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm(formOptions);

  const onSubmit = (formState: SignUpFormState) => {
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
          <input
            type="password"
            placeholder="Confirm Password"
            name="confirmPassword"
            {...register('confirmPassword')}
            className={errors.confirmPassword ? 'input-error' : ''}
          />
        </div>
        <div className="input-group">
          <Button onClick={handleSubmit(onSubmit)} className="button">
            Sign Up
          </Button>
        </div>
      </div>
    </>
  );
}
