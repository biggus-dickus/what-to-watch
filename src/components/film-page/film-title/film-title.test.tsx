import * as React from 'react';
import * as renderer from 'react-test-renderer';

import FilmTitle from './film-title';


it(`<FilmTitle /> should render correctly`, () => {
  const props = {
    name: `Deep Throat`,
    genre: `Films for the whole family`,
    released: 1972
  };

  expect(renderer.create(<FilmTitle {...props} />).toJSON()).toMatchSnapshot();
});
