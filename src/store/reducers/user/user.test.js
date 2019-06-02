import {ActionType} from '../../action-types';
import {userReducer} from './user';

const originalState = {
  isAuthorizationRequired: false
};


describe(`User reducer test suite`, () => {
  it(`should change the state correctly`, () => {
    const newState = userReducer(originalState, {
      type: ActionType.AUTH_REQUIRED,
      payload: true
    });

    expect(newState.isAuthorizationRequired).toEqual(true);
  });

  it(`should return original state in case the action is not passed or unknown`, () => {
    expect(userReducer(originalState, undefined)).toEqual(originalState);
  });
});
