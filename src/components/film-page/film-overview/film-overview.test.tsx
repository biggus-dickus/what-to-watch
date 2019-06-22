import * as React from 'react';
import * as renderer from 'react-test-renderer';

import {mockFilms} from '../../../mocks/films';
import FilmOverview from './film-overview';


const props = {
  description: mockFilms[0].description,
  director: mockFilms[0].director,
  rating: mockFilms[0].rating,
  scoresCount: mockFilms[0].scoresCount,
  starring: mockFilms[0].starring
};

it(`<FilmOverview /> should render correctly`, () => {
  expect(renderer.create(<FilmOverview {...props} />).toJSON()).toMatchSnapshot();
});
