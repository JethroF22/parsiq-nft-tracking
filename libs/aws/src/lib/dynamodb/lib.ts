import { createDynamodbDocumentClient } from '../config/';

export const writeToDb = async <T>(record: T) => {
  const documentClient = createDynamodbDocumentClient();
  const params = {
    TableName: process.env.DYNAMODB_TABLE_NAME,
    Item: {
      ...record,
    },
  };

  return documentClient.put(params).promise();
};

export const getRecords = async <T>(
  KeyConditionExpression: string,
  ExpressionAttributeValues: any,
  ExpressionAttributeNames?: any,
  IndexName?: string,
  FilterExpression?: string
): Promise<T[]> => {
  const documentClient = createDynamodbDocumentClient();
  const params = {
    TableName: process.env.DYNAMODB_TABLE_NAME,
    KeyConditionExpression,
    ExpressionAttributeValues,
  };

  if (ExpressionAttributeNames) {
    params['ExpressionAttributeNames'] = ExpressionAttributeNames;
  }

  if (IndexName) {
    params['IndexName'] = IndexName;
  }

  if (FilterExpression) {
    params['FilterExpression'] = FilterExpression;
  }

  const result = await documentClient.query(params).promise();
  return result.Items as T[];
};
