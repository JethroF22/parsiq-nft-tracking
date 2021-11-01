import express, { Request, Response } from 'express';

import { Message } from '@parsiq-nft-tracking/api-interfaces';
import { triggerStepFunction } from '../lib/aws';

const addressesRouter = express.Router();

const greeting: Message = { message: 'This is the events endpoint' };

addressesRouter.post('/new', async (req: Request, res: Response) => {
  try {
    await triggerStepFunction(req.body);
  } catch (error) {
    return {
      message: 'Error',
      error,
    };
  }
});

addressesRouter.get('/', (req, res) => {
  res.send(greeting);
});

export { addressesRouter };
