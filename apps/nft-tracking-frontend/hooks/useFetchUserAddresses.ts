import { useContext, useState, useEffect } from 'react';

import { Context } from '../context';
import { fetchUserAddresses } from '../lib/addresses';
import { RequestState } from '../types/http';

export default function useFetchUserAddresses(): [any[], RequestState] {
  const {
    state: {
      auth: { user },
    },
  } = useContext(Context);
  const { username: userId } = user;
  const [addresses, setAddresses] = useState([]);
  const [requestState, setRequestState] = useState<RequestState>(
    RequestState.IDLE
  );

  useEffect(() => {
    const fetchAddresses = async () => {
      try {
        setRequestState(RequestState.LOADING);
        const { addresses } = await fetchUserAddresses(userId);
        console.log('addresses', addresses);
        setAddresses(
          addresses.map((address) => ({
            ...address,
            id: `${address.user_id}:${address.address}`,
          }))
        );
        setRequestState(RequestState.RESOLVED);
      } catch (error) {
        console.log('error', error);
        setRequestState(RequestState.REJECTED);
      }
    };
    fetchAddresses();
  }, [userId]);

  return [addresses, requestState];
}
