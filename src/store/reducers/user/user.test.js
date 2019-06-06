import MockAdapter from 'axios-mock-adapter';

import {ApiEndpoint} from '../../../config/api-endpoints';

import {ActionType} from '../../action-types';
import {createAPI} from '../../../api/api';
import {Operation} from '../../operations';
import {userReducer} from './user';

import mockUser from '../../../mocks/user';

const originalState = {
  authError: null,
  isAuthorizationRequired: false,
  userData: null
};

const stateCopy = {...originalState};

const mockApiSetup = (mockEmail, mockPassword) => {
  const dispatch = jest.fn();
  const api = createAPI(dispatch);
  const apiMock = new MockAdapter(api);

  const getUserData = Operation.getUserData();
  const tryLogin = Operation.tryLogin(mockEmail, mockPassword);

  return {api, apiMock, dispatch, getUserData, tryLogin};
};

const validCredentials = [`test@test.com`, 2128506];
const invalidCredentials = [`trololo`, 666];


describe(`User reducer test suite`, () => {
  it(`should handle the result of a POST request to '/login'`, () => {
    const [email, password] = validCredentials;
    const {api, apiMock, dispatch, tryLogin} = mockApiSetup(email, password);

    apiMock.onPost(ApiEndpoint.LOGIN, {params: {email, password}})
      .reply(200, mockUser);

    return tryLogin(dispatch, jest.fn(), api)
      .then((data) => {
        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.GET_USER_DATA,
          payload: data,
        });
      });
  });

  it(`should return the error for request with invalid credentials`, () => {
    const [email, password] = invalidCredentials;
    const {api, apiMock, dispatch, tryLogin} = mockApiSetup(email, password);

    apiMock.onPost(ApiEndpoint.LOGIN, {params: {email, password}})
      .reply(400, {
        response: {
          status: 400,
          data: {
            response: {
              status: 400,
              data: {response: {error: `Invalid email`}}
            }
          }
        }
      });

    api.post(ApiEndpoint.LOGIN, {params: {email, password}}).then((data) => {
      console.log(`test-test`, data); // eslint-disable-line
    });

    return tryLogin(dispatch, jest.fn(), api)
      .then((data) => {
        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.AUTH_FAIL,
          payload: data,
        });
      });
  });

  it(`should dispatch 'authorizationRequired' action on attempt to receive user data for unauthenticated user`, () => {
    const {api, apiMock, dispatch, getUserData} = mockApiSetup();

    apiMock.onGet(ApiEndpoint.LOGIN)
      .reply(403, {error: `Authorization required`});

    return getUserData(dispatch, jest.fn(), api).then(() => {
      expect(dispatch).toHaveBeenCalledTimes(1);
      expect(dispatch).toHaveBeenNthCalledWith(1, {
        type: ActionType.AUTH_REQUIRED,
        payload: true,
      });
    });
  });


  it(`should set the 'authRequired' flag correctly`, () => {
    const newState = userReducer(originalState, {
      type: ActionType.AUTH_REQUIRED,
      payload: true
    });

    expect(newState.isAuthorizationRequired).toEqual(true);
  });

  it(`should return obtained userData correctly`, () => {
    const userData = mockUser;

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
