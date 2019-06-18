import {Action} from 'redux'; // eslint-disable-line

import {ActionType} from './action-types';
import {User} from '../types'; // eslint-disable-line

export interface GenericAction extends Action<string> {
  payload?: any
}

export const ActionCreator = {
  changeGenre: (genre: string) => ({
    type: ActionType.CHANGE_GENRE,
    payload: genre
  }),

  getUserData: (data: User) => ({
    type: ActionType.GET_USER_DATA,
    payload: data
  }),

  getAuthError: (error: string) => ({
    type: ActionType.AUTH_FAIL,
    payload: error
  }),

  loadMovies: (movies: any[]) => ({
    type: ActionType.LOAD_MOVIES,
    payload: movies
  }),

  requireAuthorization: (isRequired: boolean) => ({
    type: ActionType.AUTH_REQUIRED,
    payload: isRequired
  })
};
