import React from 'react';
import {StaticRouter as Router} from 'react-router-dom';
import renderer from 'react-test-renderer';

import {mockFilms} from '../../mocks/films';
import {mockGenres} from '../../mocks/genres';
import mockUser from '../../mocks/user';

import Main from './main';

const props = {
  genres: mockGenres,
  currentGenre: mockGenres[0],
  location: {
    hash: ``,
    key: `lxok4h`,
    pathname: `/`,
    search: ``
  },
  movies: mockFilms,
  onGenreChange: jest.fn(),
  onViewChange: jest.fn(),
  userData: mockUser
};


it(`renders correctly after relaunch`, () => {
  const tree = renderer.create(<Router><Main {...props} /></Router>).toJSON();
  expect(tree).toMatchSnapshot();
});
