import {ActionType} from './action-types';

export const ActionCreator = {
  changeGenre: (genre) => ({
    type: ActionType.CHANGE_GENRE,
    payload: genre
  }),

  getUserData: (data) => ({
    type: ActionType.GET_USER_DATA,
    payload: data
  }),

  loadMovies: (movies) => ({
    type: ActionType.LOAD_MOVIES,
    payload: movies
  }),

  requireAuthorization: (isRequired) => ({
    type: ActionType.AUTH_REQUIRED,
    payload: isRequired,
  })
};
