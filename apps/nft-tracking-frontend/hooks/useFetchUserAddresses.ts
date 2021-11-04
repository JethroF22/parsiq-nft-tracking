import { useContext, useState, useEffect } from 'react';

import { ActionTypes, Context } from '../context';
import { fetchUserAddresses } from '../lib/addresses';
import { RequestState } from '../types/http';

export default function useFetchUserAddresses(): RequestState {
  const {
    state: {
      auth: { user },
    },
    dispatch,
  } = useContext(Context);
  const { username: userId } = user;
  const [requestState, setRequestState] = useState<RequestState>(
    RequestState.IDLE
  );

  useEffect(() => {
    const fetchAddresses = async () => {
      try {
        setRequestState(RequestState.LOADING);
        const { addresses } = await fetchUserAddresses(userId);
        dispatch({
          type: ActionTypes.UPDATE_STATE,
          key: 'addresses',
          data: addresses.map((address) => ({
            ...address,
            id: `${address.user_id}:${address.address}`,
          })),
        });
        setRequestState(RequestState.RESOLVED);
      } catch (error) {
        console.log('error', error);
        setRequestState(RequestState.REJECTED);
      }
    };
    fetchAddresses();
  }, [userId, dispatch]);

  return requestState;
}
