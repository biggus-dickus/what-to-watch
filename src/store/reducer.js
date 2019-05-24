import {CHANGE_GENRE} from './action-types';
import {films, getByGenre} from '../mocks/films';
import {Genre} from '../mocks/genres';


const initialState = {
  currentGenre: Genre.ALL,
  movies: [...films]
};

const getMovies = (state = initialState, action) => {
  if (action.type === CHANGE_GENRE) {
    return {
      currentGenre: action.genre,
      movies: (action.genre === Genre.ALL) ? initialState.movies : getByGenre(action.genre)
    };
  }

  return state;
};

export default getMovies;
