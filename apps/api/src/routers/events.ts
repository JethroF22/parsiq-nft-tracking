import express, { Request, Response } from 'express';

import { Message } from '@parsiq-nft-tracking/api-interfaces';
import { handleNewEvent } from '../lib';

const eventsRouter = express.Router();

const greeting: Message = { message: 'This is the events endpoint' };

eventsRouter.post('/', async (req: Request, res: Response) => {
  try {
    await handleNewEvent(req.body);
  } catch (error) {
    console.log('error', error);
  }
});

eventsRouter.get('/', (req, res) => {
  res.send(greeting);
});

export { eventsRouter };
