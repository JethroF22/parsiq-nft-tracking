import React from 'react';

import AuthScreenContainer from './styled/AuthScreenContainer';
import LoginForm from './LoginForm';

export default function LoginScreen() {
  return (
    <AuthScreenContainer>
      <div className="container">
        <div className="title">NFT Tracking Portal</div>
        <LoginForm />
      </div>
    </AuthScreenContainer>
  );
}
