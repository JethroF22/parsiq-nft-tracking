import express, { Request, Response } from 'express';

import { Message } from '@parsiq-nft-tracking/api-interfaces';

const eventsRouter = express.Router();

const greeting: Message = { message: 'This is the events endpoint' };

eventsRouter.post('/', async (req: Request, res: Response) => {
  console.log('body', req.body);
});

eventsRouter.get('/', (req, res) => {
  res.send(greeting);
});

export { eventsRouter };
