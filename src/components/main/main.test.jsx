import React from 'react';
import renderer from 'react-test-renderer';

import Main from './main';

import {mockFilms, mockGenres} from '../../mocks/mock-schmock';


it(`renders correctly after relaunch`, () => {
  const tree = renderer.create(<Main films={mockFilms} genres={mockGenres} />).toJSON();
  expect(tree).toMatchSnapshot();
});
