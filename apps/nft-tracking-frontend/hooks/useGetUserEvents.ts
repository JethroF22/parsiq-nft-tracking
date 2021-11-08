import { useContext, useEffect, useState } from 'react';

import { EventRecord } from '@parsiq-nft-tracking/aws';

import { Context } from '../context';

function removeDuplicateEvents(events: EventRecord[]): EventRecord[] {
  return events.reduce((accumulator, event) => {
    const hasProduct = !!accumulator.find(
      (uniqueEvent) => uniqueEvent.transactionHash === event.transactionHash
    );

    if (!hasProduct) {
      return [...accumulator, event];
    }

    return accumulator;
  }, []);
}

export default function useGetUserAddresses(): EventRecord[] {
  const [deduplicatedEvents, setDeduplicatedEvents] = useState<EventRecord[]>(
    []
  );
  const {
    state: { events },
  } = useContext(Context);

  useEffect(() => {
    console.log('updated events', events);
    setDeduplicatedEvents(removeDuplicateEvents(events));
  }, [events]);

  return deduplicatedEvents;
}
