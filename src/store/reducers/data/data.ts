import {ActionType} from '../../action-types';
import adapter from '../../../api/film-data-adapter';

import {Film, Review} from '../../../types'; // eslint-disable-line
import {GenericAction} from '../../actions'; // eslint-disable-line

interface DataState {
  readonly currentGenre: string,
  readonly error: string,
  readonly genres: string[],
  readonly movies: any[],
  readonly promo: Film | {},
  readonly reviews: Review[]
}


const ALL = `All genres`;

const collectGenres = (films: Film[]) => [ALL]
  .concat([...new Set(films.map((film) => film.genre))]);

const initialState: DataState = {
  currentGenre: ALL,
  error: ``,
  genres: [],
  movies: [],
  promo: {},
  reviews: [],
};

export const dataReducer = (state: DataState = initialState, action: GenericAction | undefined) => {
  switch (action.type) {
    case ActionType.LOAD_MOVIES:
      return {
        ...state,
        movies: action.payload.map(adapter),
        genres: collectGenres(action.payload)
      };

    case ActionType.CHANGE_GENRE:
      return {
        ...state,
        currentGenre: action.payload
      };

    case ActionType.GET_REVIEWS:
      return {
        ...state,
        reviews: action.payload
      };

    case ActionType.GET_NETWORK_ERROR:
      return {
        ...state,
        error: action.payload
      };

    case ActionType.GET_PROMO_MOVIE:
      return {
        ...state,
        promo: adapter(action.payload)
      };

    default: return state;
  }
};
