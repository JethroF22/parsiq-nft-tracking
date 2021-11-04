import { useContext } from 'react';

import { AddressInfo, Context } from '../context';

export default function useGetUserAddresses(): AddressInfo[] {
  const {
    state: { addresses },
  } = useContext(Context);

  return addresses;
}
