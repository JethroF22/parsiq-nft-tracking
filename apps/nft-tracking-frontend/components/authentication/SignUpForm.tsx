import { useState, useContext } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter } from 'next/router';

import {
  signUpFormValidationSchema,
  SignUpFormState,
} from '../../lib/forms/authentication';
import { signUpHandler } from '../../services';
import { Context, ActionTypes } from '../../context';

import Button from './styled/Button';
import LoadingIcon from '../common/LoadingIcon';

export default function SignUpForm() {
  const formOptions = {
    resolver: yupResolver(signUpFormValidationSchema),
  };
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm(formOptions);
  const { dispatch } = useContext(Context);
  const router = useRouter();
  const [authActionDispatched, setAuthActionState] = useState(false);

  const onSubmit = async (formState: SignUpFormState) => {
    try {
      setAuthActionState(true);
      const user = await signUpHandler(formState);
      console.log('user', user);
      dispatch({
        type: ActionTypes.UPDATE_STATE,
        key: 'auth',
        data: {
          user,
        },
      });
      router.push('/email_verification');
    } catch (error) {
      console.log('error', error);
      setAuthActionState(false);
    }
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
          {errors.email && (
            <div className="error-message">
              <p>{errors.email.message}</p>
            </div>
          )}
        </div>
        <div className="input-group">
          <input
            type="password"
            placeholder="Password"
            name="password"
            {...register('password')}
            className={errors.password ? 'input-error' : ''}
          />
          {errors.password && (
            <div className="error-message">
              <p>{errors.password.message}</p>
            </div>
          )}
        </div>
        <div className="input-group">
          <input
            type="password"
            placeholder="Confirm Password"
            name="confirmPassword"
            {...register('confirmPassword')}
            className={errors.confirmPassword ? 'input-error' : ''}
          />
          {errors.confirmPassword && (
            <div className="error-message">
              <p>{errors.confirmPassword.message}</p>
            </div>
          )}
        </div>
        <div className="input-group">
          {authActionDispatched ? (
            <LoadingIcon size="3x" />
          ) : (
            <Button onClick={handleSubmit(onSubmit)} className="button">
              Sign Up
            </Button>
          )}
        </div>
      </div>
    </>
  );
}
