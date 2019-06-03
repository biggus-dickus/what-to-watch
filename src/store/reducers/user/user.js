import {ActionType} from '../../action-types';

const initialState = {
  isAuthorizationRequired: false,
  userData: null
};

export const userReducer = (state = initialState, action = {}) => {
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

    default: return state;
  }
};
