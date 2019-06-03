import {ActionType} from '../../action-types';
import Adapter from '../../../api/film-data-adapter';


const ALL = `All genres`;

const collectGenres = (films) => [ALL]
  .concat([...new Set(films.map((film) => film.genre))]);

const initialState = {
  currentGenre: ALL,
  genres: [],
  movies: []
};

export const dataReducer = (state = initialState, action = {}) => {
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
  }

  return state;
};
