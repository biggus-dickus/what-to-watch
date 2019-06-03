import {ActionCreator} from './actions';

export const Operation = {
  loadMovies: () => (dispatch, _getState, api) => {
    return api.get(`/films`)
      .then((response) => dispatch(ActionCreator.loadMovies(response.data)));
  },

  // 403 is processed by interceptor in api
  getUserData: () => (dispatch, _getState, api) => {
    return api.get(`/login`)
      .then((res) => {
        const {response} = res;
        const {data} = response;

        const userData = (`error` in data) ? null : data;
        dispatch(ActionCreator.getUserData(userData));
      });
  },

  tryLogin: () => 42
};
