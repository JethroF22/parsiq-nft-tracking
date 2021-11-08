import React, { useEffect } from 'react';
import { useEthers } from '@usedapp/core';
import { useRouter } from 'next/router';
import { Button, Container, Box } from '@mui/material';

export default function HomeScreen() {
  const { activateBrowserWallet, account } = useEthers();
  const router = useRouter();

  useEffect(() => {
    if (account) {
      router.push('/event_feed');
    }
  }, [account, router]);

  return (
    <Container>
      <Box
        sx={{
          height: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Button
          color="primary"
          variant="contained"
          size="large"
          onClick={() => activateBrowserWallet()}
          sx={{ fontSize: '2rem' }}
        >
          Authenticate via Wallet
        </Button>
      </Box>
    </Container>
  );
}
