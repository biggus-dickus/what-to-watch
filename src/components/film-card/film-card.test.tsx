import * as React from 'react';
import * as renderer from 'react-test-renderer';

import {mockFilms} from '../../mocks/films';

import FilmCard from './film-card';


it(`<FilmCard /> should render correctly`, () => {
  const tree = renderer.create(<FilmCard {...mockFilms[0]} />).toJSON();
  expect(tree).toMatchSnapshot();
});
