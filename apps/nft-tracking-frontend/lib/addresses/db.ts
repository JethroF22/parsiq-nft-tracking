import { AddressRecord, getRecords } from '../aws';

export const getUserAddressesFromDb = async (userId: string) => {
  const KeyConditionExpression = 'user_id = :user_id';
  const ExpressionAttributeValues = {
    ':user_id': userId,
  };

  return getRecords<AddressRecord>(
    KeyConditionExpression,
    ExpressionAttributeValues
  );
};
