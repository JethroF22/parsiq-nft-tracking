import type { NextApiRequest, NextApiResponse } from 'next';

import { getUserEventsFromDb } from '../../lib/events';

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse
) {
  if (request.method === 'POST') {
    try {
      const events = await getUserEventsFromDb(request.body.userId);
      response.status(200).send({ events });
    } catch (error) {
      console.log('error', error);
      response.status(400).send({ error });
    }
  } else {
    response.status(404).send({ error: 'Not found' });
  }
}
