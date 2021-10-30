import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import Button from './styled/Button';
import { emailVerificationFormValidationSchema } from '../../lib/forms/authentication';
import ModalContainer from '../common/ModalContainer';

interface EmailVerificationFormState {
  code: string;
}

export default function EmailVerificationForm() {
  const formOptions = {
    resolver: yupResolver(emailVerificationFormValidationSchema),
  };
  const { register, handleSubmit } = useForm(formOptions);

  const onSubmit = (formState: EmailVerificationFormState) => {
    console.log('formState', formState);
  };

  return (
    <ModalContainer>
      <div className="title">Verify Your Email Address</div>
      <div className="body">
        <div className="input-container">
          <input
            type="text"
            placeholder="Verifcation Code"
            name="code"
            {...register('code')}
          />
        </div>
        <div className="input-group">
          <Button onClick={handleSubmit(onSubmit)} className="button">
            Confirm Email Address
          </Button>
        </div>
      </div>
    </ModalContainer>
  );
}
