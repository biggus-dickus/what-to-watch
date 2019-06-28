import * as React from 'react';
import {StaticRouter as Router} from 'react-router';
import * as Adapter from 'enzyme-adapter-react-16';
import {configure, mount} from 'enzyme';

import {mockFilms} from '../../mocks/films';
import {mockHTMLMediaMethods} from '../../mocks/events';
import {mockLocation} from '../../mocks/user';
import {NAV_OVERVIEW_ID, NAV_DETAILS_ID} from '../../config/config';

import {FilmPage} from './film-page';

configure({adapter: new Adapter()});


const props = {
  availableMovies: mockFilms,
  promoId: 1,
  computedMatch: {params: {id: 2}},
  loadReviews: jest.fn(),
  location: {...mockLocation, hash: `#${NAV_OVERVIEW_ID}`, pathname: `/film/2`},
  onWatchListToggle: jest.fn()
};

it(`Clicking on film tabs should change the content correctly`, () => {
  mockHTMLMediaMethods();

  const wrapper = mount(<Router><FilmPage {...props} /></Router>);
  expect(wrapper.find(`FilmOverview`)).toHaveLength(1);
  expect(wrapper.find(`FilmDetails`)).toHaveLength(0);

  const link = wrapper.find(`[href="/#${NAV_DETAILS_ID}"]`);

  link.simulate(`click`);

  expect(wrapper.find(`FilmDetails`)).toHaveLength(1);
  expect(wrapper.find(`FilmOverview`)).toHaveLength(0);

  wrapper.unmount();
});
