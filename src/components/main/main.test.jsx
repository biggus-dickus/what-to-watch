import React from 'react';
import renderer from 'react-test-renderer';

import {mockFilms, mockGenres} from '../../mocks/mock-schmock';
import Main from './main';

const props = {
  genres: mockGenres,
  currentGenre: mockGenres[0],
  movies: mockFilms,
  onGenreChange: jest.fn()
};


it(`renders correctly after relaunch`, () => {
  const tree = renderer.create(<Main {...props} />).toJSON();
  expect(tree).toMatchSnapshot();
});
