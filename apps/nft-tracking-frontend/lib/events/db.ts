import { EventRecord, getRecords, RecordTypes } from '@parsiq-nft-tracking/aws';

export const getUserEventsFromDb = async (userId: string) => {
  const KeyConditionExpression =
    'userId = :userId AND recordType = :recordType';
  const ExpressionAttributeValues = {
    ':userId': userId,
    ':recordType': RecordTypes.EVENT,
  };
  const IndexName = 'SearchByRecordType';

  return getRecords<EventRecord>(
    KeyConditionExpression,
    ExpressionAttributeValues,
    null,
    IndexName
  );
};
