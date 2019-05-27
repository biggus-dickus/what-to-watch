import React from 'react';
import renderer from 'react-test-renderer';

import {mockGenres, mockFilms} from '../../mocks/mock-schmock';
import {Catalog} from './catalog';


const props = {
  genres: mockGenres,
  filteredMovies: mockFilms.slice(-1)
};

const tree = renderer.create(<Catalog {...props} />).toJSON();

it(`<Catalog /> should render correctly`, () => expect(tree).toMatchSnapshot());
