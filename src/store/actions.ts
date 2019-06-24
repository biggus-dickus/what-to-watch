import {Action} from 'redux'; // eslint-disable-line

import {ActionType} from './action-types';
import {Review, User} from '../types'; // eslint-disable-line

export interface GenericAction extends Action<string> {
  payload?: any
}

export const ActionCreator = {
  changeGenre: (genre: string) => ({
    type: ActionType.CHANGE_GENRE,
    payload: genre
  }),

  getReviews: (data: Review) => ({
    type: ActionType.GET_REVIEWS,
    payload: data
  }),

  getUserData: (data: User) => ({
    type: ActionType.GET_USER_DATA,
    payload: data
  }),

  getAuthError: (error: string) => ({
    type: ActionType.AUTH_FAIL,
    payload: error
  }),

  getNetworkError: (error: string) => ({
    type: ActionType.GET_NETWORK_ERROR,
    payload: error
  }),

  getPromoMovie: (movie) => ({
    type: ActionType.GET_PROMO_MOVIE,
    payload: movie
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
