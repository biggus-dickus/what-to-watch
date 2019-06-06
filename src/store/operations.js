import {ActionCreator} from './actions';
import {ApiEndpoint} from '../config/api-endpoints';
import {StatusCode} from '../config/status-codes';


// all 403 errors are processed by interceptor in api
export const Operation = {
  loadMovies: () => (dispatch, _getState, api) => {
    return api.get(ApiEndpoint.FILMS)
      .then((response) => dispatch(ActionCreator.loadMovies(response.data)));
  },

  getUserData: () => (dispatch, _getState, api) => {
    return api.get(ApiEndpoint.LOGIN)
      .then((response) => {
        if (response.data) {
          dispatch(ActionCreator.getUserData(response.data));
        }
      });
  },

  tryLogin: (email, password) => (dispatch, _getState, api) => {
    const onFail = (error) => dispatch(ActionCreator.getAuthError(error));

    return api.post(ApiEndpoint.LOGIN, {email, password})
      .then((res) => {
        if (res.response && res.response.status === StatusCode.BAD_REQUEST) {
          onFail(res.response.data.error);
          return;
        }

        dispatch(ActionCreator.getUserData(res.data));
      })
      .catch((err) => onFail(err));
  }
};
