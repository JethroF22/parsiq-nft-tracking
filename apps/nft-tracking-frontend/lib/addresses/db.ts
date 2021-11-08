import {
  AddressRecord,
  getRecords,
  RecordTypes,
} from '@parsiq-nft-tracking/aws';

export const getUserAddressesFromDb = async (userId: string) => {
  console.log('userId', userId);
  const KeyConditionExpression =
    'userId = :userId AND recordType = :recordType';
  const ExpressionAttributeValues = {
    ':userId': userId,
    ':recordType': RecordTypes.ADDRESS,
  };
  const IndexName = 'SearchByRecordType';

  return getRecords<AddressRecord>(
    KeyConditionExpression,
    ExpressionAttributeValues,
    null,
    IndexName
  );
};
