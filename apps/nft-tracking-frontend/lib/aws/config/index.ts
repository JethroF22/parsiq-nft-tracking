import * as AWS from 'aws-sdk';

AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

export const createDynamodbDocumentClient = () => {
  if (process.env.DYNAMODB_ENDPOINT) {
    return new AWS.DynamoDB.DocumentClient({
      endpoint: process.env.DYNAMODB_ENDPOINT,
    });
  }

  return new AWS.DynamoDB.DocumentClient();
};
