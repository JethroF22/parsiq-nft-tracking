import { EventTypes } from '@parsiq-nft-tracking/api-interfaces';
export interface AddressRecord {
  userId: string;
  address: string;
  name: string;
  recordId: string;
  recordType: RecordTypes.ADDRESS;
}

export interface EventRecord {
  address: string;
  toAddress: string;
  transactionHash: string;
  codeAddress: string;
  tokenId: string;
  userId: string;
  recordId: string;
  eventType: EventTypes;
  recordType: RecordTypes.EVENT;
  blockTimestamp: string;
}

export enum RecordTypes {
  ADDRESS = 'ADDRESS',
  EVENT = 'EVENT',
}
