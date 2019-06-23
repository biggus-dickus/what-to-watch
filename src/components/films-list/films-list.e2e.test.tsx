import * as React from 'react';
import * as Adapter from 'enzyme-adapter-react-16';
import {configure, shallow} from 'enzyme';

import {mockFilms} from '../../mocks/films';

import FilmsList from './films-list';

configure({adapter: new Adapter()});


it(`should correctly handle the click on "Show more" button`, () => {
  const limit = mockFilms.length - 3;
  const wrapper = shallow(<FilmsList films={mockFilms} limitTo={limit} />);

  expect(wrapper.find(`[data-test="at-films-list"]`).children()).toHaveLength(limit);

  const button = wrapper.find(`[data-test="at-films-show-more"]`);
  button.simulate(`click`);

  expect(wrapper.find(`[data-test="at-films-list"]`).children()).toHaveLength(mockFilms.length);
});
