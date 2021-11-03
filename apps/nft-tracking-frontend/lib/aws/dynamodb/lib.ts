import { createDynamodbDocumentClient } from '../config/';
import { AddressRecord } from './types';

export const writeToDb = async (record: AddressRecord) => {
  const documentClient = createDynamodbDocumentClient();
  const params = {
    TableName: process.env.DYNAMODB_TABLE_NAME,
    Item: {
      ...record,
    },
  };

  return documentClient.put(params).promise();
};
