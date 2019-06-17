import {ActionType} from '../../action-types';

import {GenericAction} from '../../actions'; // eslint-disable-line
import {User} from '../../../types'; // eslint-disable-line

interface State {
  authError?: null | string,
  isAuthorizationRequired: boolean,
  userData?: User | null
}

const initialState = {
  authError: null,
  isAuthorizationRequired: false,
  userData: null
};

export const userReducer = (state: State = initialState, action: GenericAction) => {
  switch (action.type) {
    case ActionType.AUTH_REQUIRED:
      return {
        ...state,
        isAuthorizationRequired: action.payload
      };

    case ActionType.GET_USER_DATA:
      return {
        ...state,
        userData: action.payload
      };

    case ActionType.AUTH_FAIL:
      return {
        ...state,
        authError: action.payload
      };

    default: return state;
  }
};
