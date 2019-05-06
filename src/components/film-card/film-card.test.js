import React from 'react';
import renderer from 'react-test-renderer';

import FilmCard from './film-card';
import {films} from '../../mock/films';

it(`<FilmCard /> should render correctly`, () => {
  const tree = renderer.create(<FilmCard {...films[0]} />).toJSON();
  expect(tree).toMatchSnapshot();
});
