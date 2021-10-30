import React from 'react';

import SignUpForm from './SignUpForm';
import AuthScreenContainer from './styled/AuthScreenContainer';

export default function SignUpScreen() {
  return (
    <AuthScreenContainer>
      <div className="container">
        <div className="title">Sign up for the NFT Tracking Portal</div>
        <SignUpForm />
      </div>
    </AuthScreenContainer>
  );
}
