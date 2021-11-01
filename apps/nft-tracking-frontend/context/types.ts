import { Dispatch } from 'react';

export interface AppContext {
  dispatch: Dispatch<ContextUpdateAction>;
  state: AppContextState;
}

export interface AppContextState {
  auth: AuthContextState;
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
