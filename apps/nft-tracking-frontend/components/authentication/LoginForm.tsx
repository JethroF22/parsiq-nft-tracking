import { useState, useContext } from 'react';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter } from 'next/router';

import { logInHandler } from '../../services';
import { Context, ActionTypes } from '../../context';
import {
  loginFormValidationSchema,
  LoginFormState,
} from '../../lib/forms/authentication';

import Button from './styled/Button';
import LoadingIcon from '../common/LoadingIcon';

export default function LoginForm() {
  const formOptions = { resolver: yupResolver(loginFormValidationSchema) };
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm(formOptions);
  const { dispatch } = useContext(Context);
  const router = useRouter();
  const [authActionDispatched, setAuthActionState] = useState(false);

  const onSubmit = async (formState: LoginFormState) => {
    try {
      setAuthActionState(true);
      const user = await logInHandler(formState);
      console.log('user', user);
      dispatch({
        type: ActionTypes.UPDATE_STATE,
        key: 'auth',
        data: {
          user,
        },
      });
      router.push('/following/list');
    } catch (error) {
      setAuthActionState(false);
      console.log('error', error);
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
          {authActionDispatched ? (
            <LoadingIcon size="3x" />
          ) : (
            <Button onClick={handleSubmit(onSubmit)} className="button">
              Log In
            </Button>
          )}
        </div>
        <div className="input-group input-group-row">
          Don&apos;t have an account?{' '}
          <span className="link">
            <Link href="/sign_up">Sign up here.</Link>
          </span>
        </div>
      </div>
    </>
  );
}
