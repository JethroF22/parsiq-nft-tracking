import {
  AddressRecord,
  getRecords,
  transactionWriteToDb,
} from '@parsiq-nft-tracking/aws';

import { EventBody, EventTypes } from '../types/events';

const BLACK_HOLE_ADDRESS = '0x0000000000000000000000000000000000000000';

export const handleNewEvent = async (event: any) => {
  const {
    from: fromAddress,
    to: toAddress,
    tx_hash: transactionHash,
    code_address: codeAddress,
    erc721: { token_id: tokenId },
  } = event;
  const eventType =
    fromAddress === BLACK_HOLE_ADDRESS
      ? EventTypes.NEWLY_MINTED_TOKEN
      : EventTypes.TOKEN_TRANSFER;
  await writeEventToDb(eventType, {
    fromAddress,
    toAddress,
    transactionHash,
    codeAddress,
    tokenId,
  });
};

const writeEventToDb = async (eventType: EventTypes, eventBody: EventBody) => {
  let records;
  if (eventType === EventTypes.NEWLY_MINTED_TOKEN) {
    records = [
      {
        address: BLACK_HOLE_ADDRESS,
        user_id: '',
        toAddress: eventBody.toAddress,
        transactionHash: eventBody.transactionHash,
        codeAddress: eventBody.codeAddress,
        tokenId: eventBody.tokenId,
      },
    ];
  } else {
    const userIds = await getUserIds(
      eventBody.fromAddress,
      eventBody.toAddress
    );
    records = userIds.map((userId) => ({
      address: eventBody.fromAddress,
      user_id: userId,
      toAddress: eventBody.toAddress,
      transactionHash: eventBody.transactionHash,
      codeAddress: eventBody.codeAddress,
      tokenId: eventBody.tokenId,
    }));
  }

  await transactionWriteToDb(records);
};

const getUserIds = async (fromAddress: string, toAddress: string) => {
  const KeyConditionExpression = 'address = :address';
  const ExpressionAttributeValuesOne = {
    ':address': fromAddress,
  };
  const ExpressionAttributeValuesTwo = {
    ':address': toAddress,
  };
  const IndexName = 'SearchByAddress';

  const results = await Promise.all([
    getRecords<AddressRecord>(
      KeyConditionExpression,
      ExpressionAttributeValuesOne,
      null,
      IndexName
    ),
    getRecords<AddressRecord>(
      KeyConditionExpression,
      ExpressionAttributeValuesTwo,
      null,
      IndexName
    ),
  ]);
  return [...results[0].map(getUserId), ...results[1].map(getUserId)];
};

const getUserId = (record) => record.user_id;
