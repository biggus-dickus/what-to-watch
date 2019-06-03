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

  it(`should return obtained userData correctly`, () => {
    const userData = {
      email: `dick.longenhard@test.com`,
      name: `Dick Longenhard`,
      avatar: `img/1.png`
    };

    const unauthorizedUserData = null;

    const updateState = (data) => userReducer(originalState, {
      type: ActionType.GET_USER_DATA,
      payload: data
    });

    let newState = updateState(userData);
    expect(newState.userData).toStrictEqual(userData);

    newState = updateState(unauthorizedUserData);
    expect(newState.userData).toStrictEqual(unauthorizedUserData);
  });
});
