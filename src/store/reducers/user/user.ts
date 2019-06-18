import {ActionType} from '../../action-types';

import {GenericAction} from '../../actions'; // eslint-disable-line
import {User} from '../../../types'; // eslint-disable-line

interface AuthState {
  readonly authError?: null | string,
  readonly isAuthorizationRequired: boolean,
  readonly userData?: User | null
}

const initialState: AuthState = {
  authError: null,
  isAuthorizationRequired: false,
  userData: null
};

export const userReducer = (state: AuthState = initialState, action: GenericAction) => {
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
