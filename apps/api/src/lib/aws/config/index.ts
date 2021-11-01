import * as AWS from 'aws-sdk';

AWS.config.update({ region: process.env.AWS_REGION });

export const createDynamodbDocumentClient = () => {
  if (process.env.DYNAMODB_ENDPOINT) {
    return new AWS.DynamoDB.DocumentClient({
      endpoint: process.env.DYNAMODB_ENDPOINT,
    });
  }

  return new AWS.DynamoDB.DocumentClient();
};

export const stepFunctions = new AWS.StepFunctions();
