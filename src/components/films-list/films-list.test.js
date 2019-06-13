import * as React from 'react';
import renderer from 'react-test-renderer';

import {mockFilms} from '../../mocks/films';
import FilmsList from './films-list';


it(`renders correctly after relaunch`, () => {
  const tree = renderer.create(<FilmsList films={mockFilms} />).toJSON();
  expect(tree).toMatchSnapshot();
});
