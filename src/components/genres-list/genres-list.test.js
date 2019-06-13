import * as React from 'react';
import renderer from 'react-test-renderer';

import {mockGenres} from '../../mocks/genres';
import GenresList from './genres-list';


const props = {
  genres: mockGenres,
  currentGenre: mockGenres[1],
  onGenreChange: jest.fn()
};

const tree = renderer.create(<GenresList {...props} />).toJSON();

it(`<GenresList /> should render correctly`, () => expect(tree).toMatchSnapshot());
