import * as React from 'react';
import renderer from 'react-test-renderer';

import {mockGenres} from '../../../mocks/genres';
import {GenresListItem} from './genres-list-item';


const props = {
  item: mockGenres[1],
  isActive: false,
  onGenreChange: jest.fn()
};

const tree = renderer.create(<GenresListItem {...props} />).toJSON();

it(`<GenresListItem /> should render correctly`, () => expect(tree).toMatchSnapshot());
