import {
  AddressRecord,
  EventRecord,
  getRecords,
  RecordTypes,
  transactionWriteToDb,
} from '@parsiq-nft-tracking/aws';

import { EventBody, EventTypes } from '@parsiq-nft-tracking/api-interfaces';

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
  await writeEventToDb({
    fromAddress,
    toAddress,
    transactionHash,
    codeAddress,
    tokenId,
    eventType,
  });
};

const writeEventToDb = async (eventBody: EventBody) => {
  const record: EventRecord = {
    address: eventBody.fromAddress,
    toAddress: eventBody.toAddress,
    transactionHash: eventBody.transactionHash,
    userId: '',
    codeAddress: eventBody.codeAddress,
    tokenId: eventBody.tokenId,
    eventType: eventBody.eventType,
    recordType: RecordTypes.EVENT,
  };
  const userIds = await getUserIds(eventBody.fromAddress, eventBody.toAddress);
  const records: EventRecord[] = userIds.map((userId) => ({
    ...record,
    userId: userId,
  }));

  await transactionWriteToDb<EventRecord>(records);
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

const getUserId = (record) => record.userId;
