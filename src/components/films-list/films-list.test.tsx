import * as React from 'react';
import * as renderer from 'react-test-renderer';
import {StaticRouter as Router} from 'react-router-dom';

import {mockFilms} from '../../mocks/films';
import FilmsList from './films-list';


it(`renders correctly after relaunch`, () => {
  const tree = renderer.create(<Router><FilmsList films={mockFilms} /></Router>).toJSON();
  expect(tree).toMatchSnapshot();
});
