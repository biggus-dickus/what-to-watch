import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';

import {App} from './app';

import {mockGenres} from '../../mocks/mock-schmock';


describe(`App test suite:`, () => {
  it(`renders in its entirety without crashing`, () => {
    const div = document.createElement(`div`);
    ReactDOM.render(<App genres={mockGenres} />, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  // it(`App correctly renders after relaunch`, () => {
  //   const tree = renderer.create(<App genres={mockGenres} store={{x: `z`}} />).toJSON();
  //   expect(tree).toMatchSnapshot();
  // });
});
