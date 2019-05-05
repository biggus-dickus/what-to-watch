import React from 'react';
import renderer from 'react-test-renderer';

import Main from './main';

it(`renders correctly after relaunch`, () => {
  const tree = renderer.create(<Main />).toJSON();
  expect(tree).toMatchSnapshot();
});
