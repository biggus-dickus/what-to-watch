import * as React from 'react';
import * as renderer from 'react-test-renderer';

import {mockFilms} from '../../mocks/films';
import {mockGenres} from '../../mocks/genres';
import Catalog from './catalog';


const props = {
  currentGenre: mockGenres[0],
  genres: mockGenres,
  movies: mockFilms.slice(-1),
  onGenreChange: jest.fn()
};

const tree = renderer.create(<Catalog {...props} />).toJSON();

it(`<Catalog /> should render correctly`, () => expect(tree).toMatchSnapshot());
