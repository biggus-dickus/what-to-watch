import React from 'react';
import renderer from 'react-test-renderer';

import FilmCard from './film-card';
import {mockFilms} from "../../mocks/mock-schmock";

it(`<FilmCard /> should render correctly`, () => {
  const tree = renderer.create(<FilmCard {...mockFilms[0]} />).toJSON();
  expect(tree).toMatchSnapshot();
});
