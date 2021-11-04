import { AWSError } from 'aws-sdk';
import {
  TransactWriteItemsOutput,
  TransactWriteItemList,
  TransactWriteItem,
  DocumentClient,
} from 'aws-sdk/clients/dynamodb';
import { Request } from 'aws-sdk/lib/request';

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

export const transactionWriteToDb = async <T>(
  items: T[]
): Promise<TransactWriteItemsOutput[]> => {
  const documentClient = createDynamodbDocumentClient();
  const requests: TransactWriteItemList = formatPutRequests(items);

  const batches = chunkArrayOfRequests<TransactWriteItem>([...requests]);
  const transactWriteRequests: Promise<TransactWriteItemsOutput>[] =
    batches.map((batch) => createTransactWriteRequest(batch, documentClient));

  const result = await Promise.all(transactWriteRequests);

  return result;
};

export const formatPutRequests = (items): TransactWriteItemList => {
  return items.map((item) => ({
    Put: {
      TableName: process.env.DYNAMODB_TABLE_NAME,
      Item: item,
    },
  }));
};

export const chunkArrayOfRequests = <T>(array: T[], chunkSize = 10): T[][] => {
  const results = [];

  while (array.length) {
    results.push(array.splice(0, chunkSize));
  }

  return results;
};

export const createTransactWriteRequest = (
  transactItems: TransactWriteItemList,
  documentClient: DocumentClient
): Promise<TransactWriteItemsOutput> => {
  const params = {
    TransactItems: transactItems,
  };

  const ddbRequest = documentClient.transactWrite(params);

  ddbRequest.on('extractError', (response) => {
    try {
      const cancellationReasons = JSON.parse(
        response.httpResponse.body.toString()
      ).CancellationReasons;
      console.log('cancellationReasons');
      console.log(cancellationReasons);
    } catch (err) {
      // suppress this just in case some types of errors aren't JSON parseable
      console.error('Error extracting cancellation error', err);
      throw 'Failed to create plug';
    }
  });

  let reasonForFailure: string;

  return transactionRequestHandler(ddbRequest, reasonForFailure);
};

export const transactionRequestHandler = <T>(
  ddbRequest: Request<TransactWriteItemsOutput, AWSError>,
  reasonForFailure: string
): Promise<T> => {
  console.log('dispatching request', ddbRequest);
  ddbRequest.on('extractError', (response) => {
    try {
      const cancellationReasons = JSON.parse(
        response.httpResponse.body.toString()
      ).CancellationReasons;
      console.log('cancellation reasons');
      console.log(cancellationReasons);
    } catch (err) {
      // suppress this just in case some types of errors aren't JSON parseable
      console.error('Error extracting cancellation error', err);
      throw 'Failed to create plug';
    }
  });

  return new Promise<T>((resolve, reject) => {
    ddbRequest.send((err: AWSError, response: T) => {
      if (err) {
        console.error('Error performing transactWrite', {
          reasonForFailure,
          err,
        });
        return reject(err);
      }
      return resolve(response);
    });
  });
};
