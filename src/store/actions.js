import {ActionType} from './action-types';

export const ActionCreator = {
  changeGenre: (genre) => ({
    type: ActionType.CHANGE_GENRE,
    payload: genre
  }),

  loadMovies: (movies) => ({
    type: ActionType.LOAD_MOVIES,
    payload: movies
  }),

  requireAuthorization: (isRequired) => {
    return {
      type: ActionType.AUTH_REQUIRED,
      payload: isRequired,
    };
  },
};
