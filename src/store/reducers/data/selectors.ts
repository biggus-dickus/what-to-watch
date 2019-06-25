import {createSelector} from 'reselect';
import Namespace from '../name-space';

const DATA = Namespace.DATA;

export const getMovies = (state) => state[DATA].movies;
export const getGenres = (state) => state[DATA].genres;
export const getCurrentGenre = (state) => state[DATA].currentGenre;
export const getReviews = (state) => state[DATA].reviews;
export const getError = (state) => state[DATA].error;
export const getPromo = (state) => state[DATA].promo;

export const getFilteredMovies = createSelector(
    getMovies,
    getCurrentGenre,
    (allMovies, currentGenre) => allMovies.filter((it) => it.genre === currentGenre)
);
