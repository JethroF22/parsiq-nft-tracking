import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

import { Message } from '@parsiq-nft-tracking/api-interfaces';

import { eventsRouter } from './routers';

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());

const greeting: Message = { message: 'Welcome to api!' };

app.get('/api', (req, res) => {
  res.send(greeting);
});

app.use('/events', eventsRouter);

const { PORT = 8000 } = process.env;
const server = app.listen(PORT, () => {
  console.log(`Server is up at http://localhost:${PORT}`);
});
server.on('error', console.error);
