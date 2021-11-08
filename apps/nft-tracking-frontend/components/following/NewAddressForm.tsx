import React, { useState, useContext } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import Button from '@mui/material/Button';

import {
  newAddressFormValidationSchema,
  NewAddressFormState,
} from '../../lib/forms/following';

import ModalContainer from '../common/ModalContainer';
import LoadingIcon from '../common/LoadingIcon';
import { addAddressToUserData } from '../../services/addresses';
import { ActionTypes, Context } from '../../context';

interface NewAddressFormProps {
  closeModal(): void;
}

function NewAddressForm({ closeModal }: NewAddressFormProps) {
  const formOptions = { resolver: yupResolver(newAddressFormValidationSchema) };
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm(formOptions);
  const [actionInProgress, setActionState] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const { state, dispatch } = useContext(Context);

  const onSubmit = async (formState: NewAddressFormState) => {
    try {
      setErrorMessage('');
      setActionState(true);
      const { username: userId } = state.auth.user;
      await addAddressToUserData(formState, userId);
      dispatch({
        type: ActionTypes.UPDATE_STATE,
        key: 'addresses',
        data: [
          ...state.addresses,
          {
            ...formState,
            userId,
            id: `${userId}:${formState.address}`,
          },
        ],
      });
      closeModal();
    } catch (error) {
      console.log('error', error);
      setErrorMessage(error.message);
    } finally {
      setActionState(false);
    }
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
        {errors.address && (
          <div className="error-message">{errors.address.message}</div>
        )}
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
            color="primary"
            size="large"
            variant="contained"
            sx={{ fontSize: '1.5rem' }}
          >
            Track Address
          </Button>
        )}
        {errorMessage && (
          <div className="error-message">
            <p>{errorMessage}</p>
          </div>
        )}
      </div>
    </ModalContainer>
  );
}

export default NewAddressForm;
