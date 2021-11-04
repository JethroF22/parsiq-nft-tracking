import {
  AddressRecord,
  getRecords,
  RecordTypes,
} from '@parsiq-nft-tracking/aws';

export const getUserAddressesFromDb = async (userId: string) => {
  const KeyConditionExpression =
    'userId = :userId AND recordType = :recordType';
  const ExpressionAttributeValues = {
    ':userId': userId,
    ':recordType': RecordTypes.ADDRESS,
  };

  return getRecords<AddressRecord>(
    KeyConditionExpression,
    ExpressionAttributeValues
  );
};
