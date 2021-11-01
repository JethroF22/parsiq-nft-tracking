import React from 'react';
import Button from '@mui/material/Button';

import ListHeader from './styled/ListHeader';

function AddressListHeader() {
  return (
    <ListHeader>
      <div className="title">Followed Addresses</div>
      <Button
        color="inherit"
        size="large"
        variant="outlined"
        sx={{ fontSize: '1.5rem' }}
      >
        Add New
      </Button>
    </ListHeader>
  );
}

export default AddressListHeader;
