import React from 'react';
import renderer from 'react-test-renderer';

import {mockGenres, mockFilms} from '../../mocks/mock-schmock';
import Catalog from './catalog';


const props = {
  currentGenre: mockGenres[0],
  genres: mockGenres,
  movies: mockFilms.slice(-1),
  onGenreChange: jest.fn()
};

const tree = renderer.create(<Catalog {...props} />).toJSON();

it(`<Catalog /> should render correctly`, () => expect(tree).toMatchSnapshot());