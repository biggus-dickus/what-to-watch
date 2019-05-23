import {CHANGE_FILTER} from './action-types';
import {films, getByGenre} from '../mocks/films';
import {Genre} from '../mocks/genres';


const initialState = {
  currentFilter: Genre.ALL,
  movies: [...films]
};

const getMovies = (state = initialState, action) => {
  if (action.type === CHANGE_FILTER) {
    return {
      currentFilter: action.filter,
      movies: getByGenre(action.filter)
    };
  }

  return state;
};

export default getMovies;
