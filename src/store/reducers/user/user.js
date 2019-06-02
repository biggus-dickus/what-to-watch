import {ActionType} from '../../action-types';

const initialState = {
  isAuthorizationRequired: false
};

export const userReducer = (state = initialState, action = {}) => {
  if (action.type === ActionType.AUTH_REQUIRED) {
    return {...state, isAuthorizationRequired: action.payload};
  }

  return state;
};
