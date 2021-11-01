import React from 'react';
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

function Navbar() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" color="transparent">
        <Toolbar>
          <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'row' }}>
            <Button sx={{ fontSize: '1.5rem', mr: '1rem' }} color="inherit">
              <Typography variant="h4">Feed</Typography>
            </Button>
            <Button sx={{ fontSize: '1.5rem', mr: '1rem' }} color="inherit">
              <Typography variant="h4">Following</Typography>
            </Button>
          </Box>
          <Button color="inherit" size="large" sx={{ fontSize: '1.5rem' }}>
            Log Out
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default Navbar;