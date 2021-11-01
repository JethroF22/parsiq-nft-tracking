import { useContext, useState } from 'react';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { emailVerificationFormValidationSchema } from '../../lib/forms/authentication';
import { Context } from '../../context';
import { emailVerificationHandler } from '../../services';

import Button from './styled/Button';
import Modal from '../../hocs/Modal';
import LoadingIcon from '../common/LoadingIcon';

interface EmailVerificationFormState {
  code: string;
}

export default function EmailVerificationForm() {
  const formOptions = {
    resolver: yupResolver(emailVerificationFormValidationSchema),
  };
  const { register, handleSubmit } = useForm(formOptions);
  const { state } = useContext(Context);
  const [displayModal, setModalDisplayState] = useState(false);
  const [authActionDispatched, setAuthActionState] = useState(false);
  const router = useRouter();

  const onSubmit = async (formState: EmailVerificationFormState) => {
    try {
      setAuthActionState(true);
      const { username: email } = state.auth.user;
      const result = await emailVerificationHandler(formState.code, email);
      if (result === '') {
        setModalDisplayState(true);
        setAuthActionState(false);
      }
    } catch (error) {
      console.log('error', error);
      setAuthActionState(false);
    }
  };

  return (
    <>
      {displayModal && (
        <Modal>
          <div className="modal-container">
            <div className="modal-body">
              <div className="modal-message">
                You email address has been verified. You can now login using
                your registered email address
              </div>
              <span className="modal-close" onClick={() => router.push('/')}>
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
            placeholder="Verifcation Code"
            name="code"
            {...register('code')}
          />
        </div>
        <div className="input-group">
          {authActionDispatched ? (
            <LoadingIcon size="3x" />
          ) : (
            <Button onClick={handleSubmit(onSubmit)} className="button">
              Confirm Email Address
            </Button>
          )}
        </div>
      </div>
    </>
  );
}
