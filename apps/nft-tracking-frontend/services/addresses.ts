import { NewAddressFormState } from '../lib/forms/following';

export const addAddressToUserData = async (
  formState: NewAddressFormState,
  userId: string
) => {
  console.log('updating user data', formState);
  const result = await fetch('/api/addresses', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      ...formState,
      userId,
    }),
  });
  console.log('result', result);
};
