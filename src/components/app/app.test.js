import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';

import App from './app';

import {mockFilms, mockGenres} from '../../mocks/mock-schmock';


describe(`App test suite:`, () => {
  it(`renders in its entirety without crashing`, () => {
    const div = document.createElement(`div`);
    ReactDOM.render(<App films={mockFilms} genres={mockGenres} />, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it(`App correctly renders after relaunch`, () => {
    const tree = renderer.create(<App films={mockFilms} genres={mockGenres} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
