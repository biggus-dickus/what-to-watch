import React from 'react';
import renderer from 'react-test-renderer';

import {mockFilms} from '../../mocks/films';
import {mockGenres} from '../../mocks/genres';
import mockUser from '../../mocks/user';

import Main from './main';

const props = {
  genres: mockGenres,
  currentGenre: mockGenres[0],
  movies: mockFilms,
  onGenreChange: jest.fn(),
  onViewChange: jest.fn(),
  userData: mockUser
};


it(`renders correctly after relaunch`, () => {
  const tree = renderer.create(<Main {...props} />).toJSON();
  expect(tree).toMatchSnapshot();
});
