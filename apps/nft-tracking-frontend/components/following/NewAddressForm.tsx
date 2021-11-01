import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import Button from '@mui/material/Button';

import {
  newAddressFormValidationSchema,
  NewAddressFormState,
} from '../../lib/forms/following';

import ModalContainer from '../common/ModalContainer';
import LoadingIcon from '../common/LoadingIcon';

function NewAddressForm() {
  const formOptions = { resolver: yupResolver(newAddressFormValidationSchema) };
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm(formOptions);
  const [actionInProgress, setActionState] = useState(false);

  const onSubmit = (formState: NewAddressFormState) => {
    console.log('formState', formState);
  };

  return (
    <ModalContainer>
      <div className="title">Add New Address</div>
      <div className="input-group">
        <input
          type="text"
          placeholder="Address"
          name="address"
          {...register('address')}
          className={errors.address ? 'input-error' : ''}
        />
      </div>
      <div className="input-group">
        <input
          type="text"
          placeholder="Name"
          name="name"
          {...register('name')}
          className={errors.name ? 'input-error' : ''}
        />
      </div>
      <div className="input-group">
        {actionInProgress ? (
          <LoadingIcon size="3x" />
        ) : (
          <Button
            onClick={handleSubmit(onSubmit)}
            color="inherit"
            size="large"
            variant="outlined"
            sx={{ fontSize: '1.5rem' }}
          >
            Log In
          </Button>
        )}
      </div>
    </ModalContainer>
  );
}

export default NewAddressForm;
