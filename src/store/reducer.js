import {CHANGE_GENRE} from './action-types';
import {films, getByGenre} from '../mocks/films';
import {Genre} from '../mocks/genres';


const initialState = {
  currentGenre: Genre.ALL,
  movies: [...films]
};


/**
 * Update genre and perform filtering based on new genre.
 * @param {Object} state
 * @param {Object} action
 * @param {Array} [allFilms] - optional
 * @return {Object}
 */
const getMovies = (state = initialState, action, allFilms) => {
  if (action && action.type === CHANGE_GENRE) {
    const genre = action.payload;

    return {
      currentGenre: genre,
      movies: (genre === Genre.ALL) ? initialState.movies : getByGenre(genre, allFilms)
    };
  }

  return state;
};

export default getMovies;