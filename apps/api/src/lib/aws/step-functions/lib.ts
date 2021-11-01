import { stepFunctions } from '../config';
import { StepFunctionPayload } from './types';

export const triggerStepFunction = async (payload: StepFunctionPayload) => {
  const params = {
    name: `add-address-${payload.address}-${payload.userId}`,
    input: JSON.stringify({
      ...payload,
    }),
    stateMachineArn: process.env.STATE_MACHINE_ARN,
  };

  let result = null;
  try {
    result = await stepFunctions.startExecution(params).promise();
  } catch (e) {
    console.log('Error:', e);
  }

  console.log('execution result', result);

  return result;
};
