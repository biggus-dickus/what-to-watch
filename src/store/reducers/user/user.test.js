import {ActionType} from '../../action-types';
import {userReducer} from './user';

const originalState = {
  authError: null,
  isAuthorizationRequired: false,
  userData: null
};

const stateCopy = {...originalState};


describe(`User reducer test suite`, () => {
  it(`should set the 'authRequired' flag correctly`, () => {
    const newState = userReducer(originalState, {
      type: ActionType.AUTH_REQUIRED,
      payload: true
    });

    expect(newState.isAuthorizationRequired).toEqual(true);
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

  it(`should return authentication error correctly`, () => {
    const error = {
      code: 400,
      status: `Bad request`,
      message: `Email is invalid`
    };

    const newState = userReducer(originalState, {
      type: ActionType.AUTH_FAIL,
      payload: error.message
    });

    expect(newState.authError).toStrictEqual(error.message);
  });

  it(`should return original state in case the action is not passed or unknown`, () => {
    expect(userReducer(originalState, undefined)).toEqual(originalState);
  });

  it(`should not mutate the original state object`, () => {
    expect(originalState).toStrictEqual(stateCopy);
  });
});
