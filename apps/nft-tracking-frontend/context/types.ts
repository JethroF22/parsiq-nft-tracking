import { AddressRecord, EventRecord } from '@parsiq-nft-tracking/aws';
import { Dispatch } from 'react';

export interface AppContext {
  dispatch: Dispatch<ContextUpdateAction>;
  state: AppContextState;
}

export interface AppContextState {
  addresses: AddressRecord[];
  events: EventRecord[];
}

export enum ActionTypes {
  UPDATE_STATE = 'UPDATE_STATE',
  CLEAR_STATE = 'CLEAR_STATE',
}

export interface ContextUpdateAction {
  type: ActionTypes;
  key?: string;
  data?: any;
}
