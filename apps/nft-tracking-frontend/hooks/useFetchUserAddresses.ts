import { useContext, useState, useEffect } from 'react';
import { useEthers } from '@usedapp/core';

import { ActionTypes, Context } from '../context';
import { fetchUserAddresses } from '../lib/addresses';
import { RequestState } from '../types/http';

export default function useFetchUserAddresses(): RequestState {
  const { account } = useEthers();
  const { dispatch } = useContext(Context);
  const [requestState, setRequestState] = useState<RequestState>(
    RequestState.IDLE
  );

  useEffect(() => {
    const fetchAddresses = async () => {
      if (account) {
        try {
          setRequestState(RequestState.LOADING);
          const { addresses } = await fetchUserAddresses(account);
          dispatch({
            type: ActionTypes.UPDATE_STATE,
            key: 'addresses',
            data: addresses.map((address) => ({
              ...address,
              id: `${address.userId}:${address.address}`,
            })),
          });
          setRequestState(RequestState.RESOLVED);
        } catch (error) {
          console.log('error', error);
          setRequestState(RequestState.REJECTED);
        }
      }
    };
    fetchAddresses();
  }, [account, dispatch]);

  return requestState;
}
