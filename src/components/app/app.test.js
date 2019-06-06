import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';

import {mockFilms} from '../../mocks/films';
import {mockGenres} from '../../mocks/genres';
import mockUser from '../../mocks/user';

import {App} from './app';

const props = {
  currentGenre: mockGenres[2],
  filteredMovies: [],
  isAuthRequired: false,
  genres: mockGenres,
  movies: mockFilms,
  onGenreChange: jest.fn(),
  userData: mockUser
};


describe(`App test suite:`, () => {
  it(`renders in its entirety without crashing`, () => {
    const div = document.createElement(`div`);
    ReactDOM.render(<App {...props} />, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it(`App correctly renders after relaunch`, () => {
    const tree = renderer.create(<App {...props} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
