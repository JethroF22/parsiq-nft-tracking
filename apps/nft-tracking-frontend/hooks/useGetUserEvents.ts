import { useContext } from 'react';

import { EventRecord } from '@parsiq-nft-tracking/aws';

import { Context } from '../context';

export default function useGetUserAddresses(): EventRecord[] {
  const {
    state: { events },
  } = useContext(Context);

  return events;
}
