import React, { useContext } from 'react';
import { useRouter } from 'next/router';
import { useEthers } from '@usedapp/core';

import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

import { ActionTypes, Context } from '../../context';

function Navbar() {
  const { deactivate } = useEthers();
  const router = useRouter();
  const { dispatch } = useContext(Context);

  const signOut = async () => {
    deactivate();
    dispatch({
      type: ActionTypes.CLEAR_STATE,
    });
    router.push('/');
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" color="primary">
        <Toolbar>
          <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'row' }}>
            <Button
              sx={{ fontSize: '1.3rem', mr: '1rem' }}
              color="inherit"
              variant="text"
              onClick={() => router.push('/event_feed')}
            >
              <Typography variant="h5">Feed</Typography>
            </Button>
            <Button
              sx={{ fontSize: '1.3rem', mr: '1rem' }}
              color="inherit"
              variant="text"
              onClick={() => router.push('/following/list')}
            >
              <Typography variant="h5">Following</Typography>
            </Button>
          </Box>
          <Button
            color="inherit"
            size="large"
            variant="text"
            sx={{ fontSize: '1.5rem' }}
            onClick={signOut}
          >
            Log Out
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default Navbar;
