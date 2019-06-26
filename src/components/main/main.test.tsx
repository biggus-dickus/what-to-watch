import * as React from 'react';
import {StaticRouter as Router} from 'react-router-dom';
import * as renderer from 'react-test-renderer';

import {mockFilms} from '../../mocks/films';
import {mockGenreEntity} from '../../mocks/genres';
import {mockLocation} from '../../mocks/user';
import mockUser from '../../mocks/user';

import Main from './main';

const props = {
  ...mockGenreEntity,
  location: {...mockLocation},
  movies: mockFilms,
  promo: mockFilms[1],
  onAddToWatchList: jest.fn(),
  onRemoveFromWatchList: jest.fn(),
  onViewChange: jest.fn(),
  userData: mockUser
};


it(`renders correctly after relaunch`, () => {
  const tree = renderer.create(<Router><Main {...props} /></Router>).toJSON();
  expect(tree).toMatchSnapshot();
});
