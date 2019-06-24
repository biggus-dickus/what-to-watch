import * as React from 'react';
import * as renderer from 'react-test-renderer';
import * as Adapter from 'enzyme-adapter-react-16';
import {configure, shallow} from 'enzyme';

import {GENRES_LIMIT} from '../../config/config';
import {mockGenres} from '../../mocks/genres';

import GenresList from './genres-list';

configure({adapter: new Adapter()});


const props = {
  genres: mockGenres,
  currentGenre: mockGenres[1],
  onGenreChange: jest.fn()
};

describe(`GenresList test suite`, () => {
  it(`<GenresList /> should render correctly`, () => {
    const tree = renderer.create(<GenresList {...props} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it(`should display no more genres than set by config`, () => {
    const wrapper = shallow(<GenresList {...props} />);
    const genreElems = wrapper.find(`[data-test="at-genres-list"]`).children();

    expect(genreElems.length).toBeLessThanOrEqual(GENRES_LIMIT);
  });
});
