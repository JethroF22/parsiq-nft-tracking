import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Button from '@mui/material/Button';

import ListHeader from '../common/ListHeader';
import Modal from '../../hocs/Modal';
import NewAddressForm from './NewAddressForm';

function AddressListHeader() {
  const router = useRouter();
  const [displayModal, setModalDisplayState] = useState(false);
  return (
    <>
      {displayModal && (
        <Modal>
          <div className="modal-container">
            <div className="modal-body">
              <NewAddressForm closeModal={() => setModalDisplayState(false)} />
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
      <ListHeader>
        <div className="title">Followed Addresses</div>
        <Button
          color="inherit"
          size="large"
          variant="outlined"
          sx={{ fontSize: '1.5rem' }}
          onClick={() => setModalDisplayState(true)}
        >
          Add New
        </Button>
      </ListHeader>
    </>
  );
}

export default AddressListHeader;
