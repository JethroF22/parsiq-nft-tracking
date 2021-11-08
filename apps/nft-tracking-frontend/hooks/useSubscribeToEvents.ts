import { useContext, useEffect } from 'react';
import Pusher from 'pusher-js';

import { ActionTypes, Context } from '../context';

export default function useSubscribeToEvents() {
  const {
    state: {
      auth: { user },
      events,
    },
    dispatch,
  } = useContext(Context);
  const { username: userId } = user;

  useEffect(() => {
    Pusher.logToConsole = true;

    const pusher = new Pusher(process.env.NEXT_PUBLIC_PUSHER_APP_KEY, {
      cluster: process.env.NEXT_PUBLIC_PUSHER_APP_CLUSTER,
    });

    const channel = pusher.subscribe('events');
    channel.bind(`nft-event-${userId}`, function (data) {
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
  }, [userId, dispatch, events]);
}
