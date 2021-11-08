import React from 'react';
import { useRouter } from 'next/router';
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Auth } from 'aws-amplify';

function Navbar() {
  const router = useRouter();
  const signOut = async () => {
    await Auth.signOut();
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
