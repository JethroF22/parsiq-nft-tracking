import { EventTypes } from '@parsiq-nft-tracking/api-interfaces';
export interface AddressRecord {
  userId: string;
  address: string;
  name: string;
  recordType: RecordTypes.ADDRESS;
}

export interface EventRecord {
  address: string;
  toAddress: string;
  transactionHash: string;
  codeAddress: string;
  tokenId: string;
  userId: string;
  recordType: RecordTypes.EVENT;
  eventType: EventTypes;
}

export enum RecordTypes {
  ADDRESS = 'ADDRESS',
  EVENT = 'EVENT',
}
