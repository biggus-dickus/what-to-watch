import {mockGenres, mockFilms} from '../mocks/mock-schmock';
import {getByGenre} from '../mocks/films';

import {changeGenre} from './actions';
import getMovies from './reducer';

const originalState = {
  currentGenre: mockGenres[0],
  movies: [mockFilms]
};

const newState = getMovies(originalState, changeGenre(mockGenres[1]), mockFilms);


describe(`getMovies reducer test suite:`, () => {
  it(`should change current genre correctly`, () => {
    expect(newState.currentGenre).toEqual(mockGenres[1]);
  });

  it(`should not mutate the supplied state object`, () => {
    expect(newState).not.toEqual(originalState);
  });

  it(`should filter films by genre correctly`, () => {
    const filteredFilms = getByGenre(mockGenres[1], mockFilms);
    expect(newState.movies).toStrictEqual(filteredFilms);
  });
});
