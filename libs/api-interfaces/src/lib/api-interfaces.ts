export interface Message {
  message: string;
}

export enum EventTypes {
  TOKEN_TRANSFER = 'TOKEN_TRANSFER',
  NEWLY_MINTED_TOKEN = 'NEWLY_MINTED_TOKEN',
}

export interface EventBody {
  fromAddress: string;
  toAddress: string;
  transactionHash: string;
  codeAddress: string;
  tokenId: string;
  eventType: EventTypes;
  blockTimestamp: string;
}
