import { Auth } from 'aws-amplify';

export const signUpHandler = async (formState: any): Promise<any> => {
  const { email, password } = formState;
  const { user } = await Auth.signUp({
    username: email,
    password: password,
  });

  return user;
};
