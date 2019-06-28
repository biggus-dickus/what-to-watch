import {ActionType} from '../../action-types';
import adapter from '../../../api/film-data-adapter';

import {Film, Review} from '../../../types'; // eslint-disable-line
import {GenericAction} from '../../actions'; // eslint-disable-line

interface DataState {
  readonly currentGenre: string,
  readonly error: any,
  readonly genres: string[],
  readonly movies: any[],
  readonly promo: Film | {},
  readonly reviews: Review[],
  readonly watchList: Film[]
}


const ALL = `All genres`;

const collectGenres = (films: Film[]) => [ALL]
  .concat([...new Set(films.map((film) => film.genre))]);

const initialState: DataState = {
  currentGenre: ALL,
  error: null,
  genres: [],
  movies: [],
  promo: {},
  reviews: [],
  watchList: []
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

    case ActionType.GET_WATCH_LIST:
      return {
        ...state,
        watchList: action.payload.map(adapter)
      };

    case ActionType.UPDATE_MOVIE:
      const newMovie = adapter(action.payload);
      const movieToReplace = state.movies.find((movie) => movie.id === newMovie.id);

      const newMovies = [...state.movies];
      newMovies.splice(state.movies.indexOf(movieToReplace), 1, newMovie);

      return {
        ...state,
        movies: newMovies
      };

    default: return state;
  }
};
