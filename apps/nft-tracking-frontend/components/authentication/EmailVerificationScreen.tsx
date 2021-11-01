import React from 'react';

import AuthScreenContainer from './styled/AuthScreenContainer';
import EmailVerificationForm from './EmailVerificationForm';

export default function EmailVerificationScreen() {
  return (
    <AuthScreenContainer>
      <div className="container">
        <div className="title">Verify Your Email Address</div>
        <EmailVerificationForm />
      </div>
    </AuthScreenContainer>
  );
}
