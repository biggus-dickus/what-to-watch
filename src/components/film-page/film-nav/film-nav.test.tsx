import * as React from 'react';
import {StaticRouter as Router} from 'react-router';
import * as renderer from 'react-test-renderer';

import {filmTabs} from '../../../config/config';
import FilmNav from './film-nav';


const props = {
  activeTabId: filmTabs[0].id,
  tabs: filmTabs,
  onTabClick: jest.fn()
};

it(`<FilmNav /> should render correctly`, () => {
  expect(renderer.create(<Router><FilmNav {...props} /></Router>).toJSON()).toMatchSnapshot();
});
