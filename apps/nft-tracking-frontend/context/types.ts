import { Dispatch } from 'react';

export interface AppContext {
  dispatch: Dispatch<ContextUpdateAction>;
  state: AppContextState;
}

export interface AddressInfo {
  address: string;
  userId: string;
  name: string;
}

export interface AppContextState {
  auth: AuthContextState;
  addresses: AddressInfo[];
}

export interface AuthContextState {
  user: any;
}

export enum ActionTypes {
  UPDATE_STATE = 'UPDATE_STATE',
}

export interface ContextUpdateAction {
  type: ActionTypes;
  key: string;
  data: any;
}
