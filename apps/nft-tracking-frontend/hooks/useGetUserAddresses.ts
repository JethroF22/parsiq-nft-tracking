import { useContext } from 'react';

import { AddressRecord } from '@parsiq-nft-tracking/aws';

import { Context } from '../context';

export default function useGetUserAddresses(): AddressRecord[] {
  const {
    state: { addresses },
  } = useContext(Context);

  return addresses;
}
