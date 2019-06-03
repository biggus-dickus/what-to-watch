import {ActionCreator} from './actions';

export const Operation = {
  loadMovies: () => (dispatch, _getState, api) => {
    return api.get(`films`)
      .then((response) => dispatch(ActionCreator.loadMovies(response.data)));
  }
};
