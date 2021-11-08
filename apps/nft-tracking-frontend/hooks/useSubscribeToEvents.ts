import { useContext, useEffect } from 'react';
import Pusher from 'pusher-js';
import { useEthers } from '@usedapp/core';

import { ActionTypes, Context } from '../context';

export default function useSubscribeToEvents() {
  const { account } = useEthers();
  const {
    state: { events },
    dispatch,
  } = useContext(Context);

  useEffect(() => {
    Pusher.logToConsole = true;

    const pusher = new Pusher(process.env.NEXT_PUBLIC_PUSHER_APP_KEY, {
      cluster: process.env.NEXT_PUBLIC_PUSHER_APP_CLUSTER,
    });

    const channel = pusher.subscribe('events');
    channel.bind(`nft-event-${account}`, function (data) {
      console.log('updating data', data);
      dispatch({
        type: ActionTypes.UPDATE_STATE,
        key: 'events',
        data: [
          ...events,
          {
            ...data,
            id: data.transactionHash,
          },
        ],
      });
    });
    return () => {
      pusher.unsubscribe('events');
    };
  }, [account, dispatch, events]);
}
