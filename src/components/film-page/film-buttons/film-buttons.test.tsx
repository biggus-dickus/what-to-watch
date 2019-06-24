import * as React from 'react';
import {StaticRouter as Router} from 'react-router';
import * as renderer from 'react-test-renderer';

import FilmButtons from './film-buttons';


const props = {
  filmId: 1,
  isAdded: false
};

it(`<FilmButtons /> should render correctly`, () => {
  expect(renderer.create(<Router><FilmButtons {...props} /></Router>).toJSON()).toMatchSnapshot();
});
