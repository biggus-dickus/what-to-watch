import {ActionType} from '../../action-types';
import Adapter from '../../../api/film-data-adapter';

import {Film} from '../../../types'; // eslint-disable-line
import {GenericAction} from '../../actions'; // eslint-disable-line

interface DataState {
  currentGenre: string,
  genres: string[],
  movies: any[]
}


const ALL = `All genres`;

const collectGenres = (films: Film[]) => [ALL]
  .concat([...new Set(films.map((film) => film.genre))]);

const initialState: DataState = {
  currentGenre: ALL,
  genres: [],
  movies: []
};

export const dataReducer = (state: DataState = initialState, action: GenericAction | undefined) => {
  switch (action.type) {
    case ActionType.LOAD_MOVIES:
      return {
        ...state,
        movies: action.payload.map(Adapter),
        genres: collectGenres(action.payload)
      };

    case ActionType.CHANGE_GENRE:
      return {
        ...state,
        currentGenre: action.payload
      };

    default: return state;
  }
};
