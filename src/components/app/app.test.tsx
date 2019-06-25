import * as React from 'react';
import {StaticRouter as Router} from 'react-router-dom';
import * as ReactDOM from 'react-dom';
import * as renderer from 'react-test-renderer';

import {mockFilms} from '../../mocks/films';
import {mockGenres} from '../../mocks/genres';
import {mockHTMLMediaMethods} from '../../mocks/events';
import mockUser from '../../mocks/user';

import {App} from './app';

const props = {
  currentGenre: mockGenres[2],
  filteredMovies: [],
  genres: mockGenres,
  movies: mockFilms,
  onGenreChange: jest.fn(),
  onPromoFetch: jest.fn(),
  onReviewAdd: jest.fn(),
  onReviewRemove: jest.fn(),
  promo: mockFilms[1],
  userData: mockUser
};


describe(`App test suite:`, () => {
  it(`renders in its entirety without crashing`, () => {
    mockHTMLMediaMethods();

    const div = document.createElement(`div`);
    ReactDOM.render(<Router><App {...props} /></Router>, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it(`App correctly renders after relaunch`, () => {
    const tree = renderer.create(<Router><App {...props} /></Router>).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
