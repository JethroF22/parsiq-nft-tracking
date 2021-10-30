import React from 'react';

import LoginScreenContainer from './styled/LoginScreenContainer';
import LoginForm from './LoginForm';

export default function LoginScreen() {
  return (
    <LoginScreenContainer>
      <div className="container">
        <div className="title">NFT Tracking Portal</div>
        <LoginForm />
      </div>
    </LoginScreenContainer>
  );
}
