import {
  AddressRecord,
  EventRecord,
  getRecords,
  RecordTypes,
  transactionWriteToDb,
} from '@parsiq-nft-tracking/aws';
import Pusher from 'pusher';

import { EventBody, EventTypes } from '@parsiq-nft-tracking/api-interfaces';

const BLACK_HOLE_ADDRESS = '0x0000000000000000000000000000000000000000';

export const handleNewEvent = async (event: any) => {
  const {
    from: fromAddress,
    to: toAddress,
    tx_hash: transactionHash,
    code_address: codeAddress,
    erc721: { token_id: tokenId },
    block_timestamp: blockTimestamp,
  } = event;
  const eventType =
    fromAddress === BLACK_HOLE_ADDRESS
      ? EventTypes.NEWLY_MINTED_TOKEN
      : EventTypes.TOKEN_TRANSFER;
  const records = await writeEventToDb({
    fromAddress,
    toAddress,
    transactionHash,
    codeAddress,
    tokenId,
    eventType,
    blockTimestamp,
  });

  const pusher = new Pusher({
    key: process.env.PUSHER_APP_KEY,
    appId: process.env.PUSHER_APP_ID,
    secret: process.env.PUSHER_APP_SECRET,
    cluster: process.env.PUSHER_APP_CLUSTER,
    useTLS: true,
  });

  records.forEach((record) => {
    console.log('triggering event ', `nft-event-${record.userId}`);
    pusher.trigger('events', `nft-event-${record.userId}`, record);
  });
};

const writeEventToDb = async (eventBody: EventBody): Promise<EventRecord[]> => {
  const record: EventRecord = {
    address: eventBody.fromAddress,
    toAddress: eventBody.toAddress,
    transactionHash: eventBody.transactionHash,
    userId: '',
    codeAddress: eventBody.codeAddress,
    tokenId: eventBody.tokenId,
    eventType: eventBody.eventType,
    recordId: `${RecordTypes.EVENT}:${eventBody.transactionHash}`,
    recordType: RecordTypes.EVENT,
    blockTimestamp: eventBody.blockTimestamp,
  };
  console.log('record', record);
  const userIds = await getUserIds(
    eventBody.fromAddress,
    eventBody.toAddress,
    eventBody.codeAddress
  );
  const uniqueUserIds = [...new Set(userIds)];
  const records: EventRecord[] = uniqueUserIds.map((userId) => ({
    ...record,
    userId: userId,
  }));

  await transactionWriteToDb<EventRecord>(records);

  return records;
};

const getUserIds = async (
  fromAddress: string,
  toAddress: string,
  codeAddress: string
) => {
  const KeyConditionExpression = 'address = :address';
  const ExpressionAttributeValuesOne = {
    ':address': fromAddress,
  };
  const ExpressionAttributeValuesTwo = {
    ':address': toAddress,
  };
  const ExpressionAttributeValuesThree = {
    ':address': codeAddress,
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
    getRecords<AddressRecord>(
      KeyConditionExpression,
      ExpressionAttributeValuesThree,
      null,
      IndexName
    ),
  ]);
  return [
    ...results[0].map(getUserId),
    ...results[1].map(getUserId),
    ...results[2].map(getUserId),
  ];
};

const getUserId = (record) => record.userId;
