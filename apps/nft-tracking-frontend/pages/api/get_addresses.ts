import type { NextApiRequest, NextApiResponse } from 'next';

import { getUserAddressesFromDb } from '../../lib/addresses';

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse
) {
  if (request.method === 'POST') {
    try {
      const addresses = await getUserAddressesFromDb(request.body.userId);
      response.status(200).send({ addresses });
    } catch (error) {
      console.log('error', error);
      response.status(400).send({ error });
    }
  } else {
    response.status(404).send({ error: 'Not found' });
  }
}
