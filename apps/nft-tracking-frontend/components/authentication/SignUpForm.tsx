import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import Button from './styled/Button';
import Modal from '../../hocs/Modal';

import {
  signUpFormValidationSchema,
  SignUpFormState,
} from '../../lib/forms/authentication';
import { signUpHandler } from '../../services';

export default function SignUpForm() {
  const formOptions = {
    resolver: yupResolver(signUpFormValidationSchema),
  };
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm(formOptions);
  const [displayModal, setModalDisplayState] = useState(false);

  const onSubmit = async (formState: SignUpFormState) => {
    try {
      const user = await signUpHandler(formState);
      console.log('user', user);
      setModalDisplayState(true);
    } catch (error) {
      console.log('error', error);
    }
  };

  return (
    <>
      {displayModal && (
        <Modal>
          <div className="modal-container">
            <div className="modal-body">
              <div>Enter Verification Code</div>
              <span
                className="modal-close"
                onClick={() => setModalDisplayState(false)}
              >
                &times;
              </span>
            </div>
          </div>
        </Modal>
      )}
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
          <Button onClick={handleSubmit(onSubmit)} className="button">
            Sign Up
          </Button>
        </div>
      </div>
    </>
  );
}
