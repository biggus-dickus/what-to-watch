import * as React from 'react';
import * as renderer from 'react-test-renderer';
import {StaticRouter as Router} from 'react-router-dom';

import {mockFilms} from '../../mocks/films';

import FilmCard from './film-card';


it(`<FilmCard /> should render correctly`, () => {
  const tree = renderer.create(<Router><FilmCard {...mockFilms[0]} /></Router>).toJSON();
  expect(tree).toMatchSnapshot();
});
