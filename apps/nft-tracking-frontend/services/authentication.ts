import { Auth } from 'aws-amplify';
import { SignUpFormState } from '../lib/forms/authentication';

export const signUpHandler = async (
  formState: SignUpFormState
): Promise<any> => {
  const { email, password } = formState;
  const { user } = await Auth.signUp({
    username: email,
    password: password,
  });

  return user;
};

export const emailVerificationHandler = async (code: string, email: string) => {
  try {
    await Auth.confirmSignUp(email, code);
    return '';
  } catch (error) {
    console.log('error', error);
    if (error.code === 'CodeMismatchException') {
      return 'Invalid code. Please enter a valid code or request a new code';
    } else if (error.code === 'ExpiredCodeException') {
      return 'Code has expired. Please request a new code';
    } else {
      return 'An unexpected server error occurred. Please try again later';
    }
  }
};
