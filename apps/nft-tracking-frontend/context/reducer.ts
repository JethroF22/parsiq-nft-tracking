import { AppContextState, ContextUpdateAction, ActionTypes } from './types';

export const appContextReducer = (
  state: AppContextState,
  action: ContextUpdateAction
) => {
  switch (action.type) {
    case ActionTypes.UPDATE_STATE:
      return {
        ...state,
        [action.key]: action.data,
      };
    case ActionTypes.CLEAR_STATE:
      return {
        addresses: [],
        events: [],
      };
    default:
      return state;
  }
};
