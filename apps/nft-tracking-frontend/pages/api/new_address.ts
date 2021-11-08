import type { NextApiRequest, NextApiResponse } from 'next';

import {
  AddressRecord,
  RecordTypes,
  writeToDb,
} from '@parsiq-nft-tracking/aws';

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse
) {
  if (request.method === 'POST') {
    try {
      const errorMessage = await makeUserDataRequest(request.body);
      if (errorMessage) {
        response.status(400).send({ message: errorMessage });
      }
      const result = await writeToDb<AddressRecord>({
        userId: request.body.userId,
        name: request.body.name,
        address: request.body.address,
        recordId: `${RecordTypes.ADDRESS}:${request.body.address}`,
        recordType: RecordTypes.ADDRESS,
      });
      console.log('result', result);
    } catch (error) {
      console.log('error', error);
      response
        .status(400)
        .send({ message: 'An unknown server error has occurred' });
    }
    response.status(200).send({ message: 'Updated tracked addresses' });
  } else {
    response.status(404).send({ error: 'Not found' });
  }
}

const makeUserDataRequest = async (requestBody: any) => {
  const userDataUpdateResponse = await fetch(
    `https://api.parsiq.net/v1/data/${process.env.USER_DATA_TABLE_ID}`,
    {
      headers: {
        Authorization: `Bearer ${process.env.PARSIQ_API_KEY}`,
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify([{ address: requestBody.address }]),
    }
  );
  if (userDataUpdateResponse.status !== 204) {
    const [isInTable, errorMessage] = await handleUserDataRequestError(
      userDataUpdateResponse,
      requestBody.address
    );
    if (!isInTable) {
      return errorMessage;
    }
  }
};

const handleUserDataRequestError = async (
  response: Response,
  address: string
) => {
  const result = await response.json();
  const uniqueConstraintErrorMessage = `${address} is already in table. Use PATCH or PUT to modify its value.`;
  let isInTable = false;
  const errorMessage = 'An unknown server error has occurred';
  if (response.status === 400) {
    result.message.forEach((message: any) => {
      if (
        'isNotInTableYet' in message.constraints &&
        message.constraints['isNotInTableYet'] === uniqueConstraintErrorMessage
      ) {
        isInTable = true;
      }
    });
  }
  return [isInTable, errorMessage];
};
