import { EventRecord } from '@parsiq-nft-tracking/aws';
import { useContext, useState, useEffect } from 'react';
import { useEthers } from '@usedapp/core';

import { ActionTypes, Context } from '../context';
import { fetchUserEvents } from '../lib/events';
import { RequestState } from '../types/http';

export default function useFetchUserEvents(): RequestState {
  const { account } = useEthers();
  const { dispatch } = useContext(Context);
  const [requestState, setRequestState] = useState<RequestState>(
    RequestState.IDLE
  );

  useEffect(() => {
    const fetchEvents = async () => {
      if (account) {
        try {
          setRequestState(RequestState.LOADING);
          const { events } = await fetchUserEvents(account);
          dispatch({
            type: ActionTypes.UPDATE_STATE,
            key: 'events',
            data: events.map((event: EventRecord) => ({
              ...event,
              id: event.transactionHash,
            })),
          });
          setRequestState(RequestState.RESOLVED);
        } catch (error) {
          console.log('error', error);
          setRequestState(RequestState.REJECTED);
        }
      }
    };
    fetchEvents();
  }, [account, dispatch]);

  return requestState;
}
