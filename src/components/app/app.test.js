import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';

import {mockGenres, mockFilms} from '../../mocks/mock-schmock';
import {App} from './app';

const props = {
  currentGenre: mockGenres[2],
  movies: mockFilms,
  onGenreChange: jest.fn()
};


describe(`App test suite:`, () => {
  it(`renders in its entirety without crashing`, () => {
    const div = document.createElement(`div`);
    ReactDOM.render(<App {...props} />, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it(`App correctly renders after relaunch`, () => {
    const tree = renderer.create(<App {...props} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
